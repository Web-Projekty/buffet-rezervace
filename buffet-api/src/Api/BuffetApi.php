<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Api\AuthApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\CategoryModel;
use Buffet\Database\Models\ItemModel;
use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\PaymentModel;
use Buffet\Database\Models\TempModel;
use Buffet\Database\Models\TimeslotModel;
use Buffet\Database\Models\UserModel;
use Buffet\Database\Models\VariantModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\EventTypes;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Exceptions\OutOfOrderIdsException;
use Buffet\Types\Exceptions\PaymentCreationException;
use Buffet\Types\Exceptions\SettingsException;
use Buffet\Types\OrderStatus;
use Buffet\Types\PaymentMethods;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvReader;
use Buffet\Utils\EnvWriter;
use Buffet\Utils\HttpClient;
use Buffet\Utils\WebsocketClient;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use DateException;
use Exception;
use Illuminate\Support\Collection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use RuntimeException;
use TypeError;
use ValueError;

class BuffetApi
{

    /**
     * Main API function called by router.
     *
     * Handles api request calls
     *
     * @param  ServerRequestInterface $request
     * @param  ResponseInterface      $html
     * @return ResponseInterface      html code
     */

    public ServerRequestInterface $requestInterface;

    function main(ServerRequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $this->requestInterface = $request;

        try {
            $response = $this->handleApiCall();
        } catch (SettingsException $e) {
            $response = (new ApiResponse())->setError(Error::SettingsError);
        }

        if ($response == null || get_class($response) != "Buffet\Types\ApiResponse") {
            $response = new ApiResponse();
            $response->setError(Error::InvalidDataType);
        }

        $JsonOut = (string) $response;

        $html->getBody()->write((string) $JsonOut);

        return $html->withHeader('Content-type', 'application/json');
    }

    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $html
     */
    function handleThePayNotification(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $response = new ApiResponse();
        $dbMan = new DatabaseManager($response);
        $dbMan->setupConnection();
        $query = $request->getQueryParams();

        $type = $query["type"];
        $paymentUid = $query["payment_uid"];
        $projectId = $query["project_id"];

        $token = JWTApi::getAdminToken();

        $msg = [
            "requestType" => "updatePayment",
            "token" => $token,
            "type" => $type,
            "paymentId" => $paymentUid
        ];

        error_log(HttpClient::post("http://localhost/api", json_encode($msg)));

        /*foreach ($request->getQueryParams() as $key => $param) {
        error_log("Key: " . $key . "Param: " . $param);
        }*/
        return $html;
    }

    /**
     * Main API handler.
     *
     * Calls specified requestType methods
     *
     * @param  string      $request
     * @return ApiResponse API response
     */
    function handleApiCall(string $request = null): ApiResponse
    {
        if (!$request) {
            $request = $this->getPostJson();

        } else {
            $request = json_decode($request, true);
        }

        /**
         * @var ApiResponse
         */
        $response = new ApiResponse($request);

        $dbMan = new DatabaseManager($response);
        $dbMan->setupConnection();

        if ($response->hasFailed()) {
            return $response;
        }

        switch ($response->getRequestType()) {
            case "test":
                return $this->handleTest($response);

            case "register";
                return $this->handleRegister($response);

            case "login":
                return $this->handleLogin($response);

            case "verify":
                return $this->handleVerify($response);

            case "getMenu":
                return $this->handleGetMenu($response);

            case "isAdmin":
                return $this->handleIsAdmin($response);

            case "getOrders":
                return $this->handleGetOrders($response);

            case "createOrder":
                return $this->handleCreateOrder($response);

            case "generateTimeslots":
                return $this->handleGenerateTimeslots($response);

            case "generateTemp":
                return $this->handleGenerateTemp($response);

            case "getOrderTimeTable":
                return $this->handleGetOrderTimeTable($response);

            case "makeOrderEvent":
                return $this->handleMakeOrderEvent($response); // for testing

            case "updateOrder":
                return $this->handleUpdateOrder($response);

            case "updatePayment":
                return $this->handleUpdatePayment($response);

            case "updateUser":
                return $this->handleUpdateUser($response);

            case "updatePassword":
                return $this->handleUpdatePassword($response);

            case "updateSetting":
                return $this->handleUpdateSetting($response);

            case "updateItem":
                return $this->handleUpdateItem($response);

            case "removeItem":
                return $this->handleRemoveItem($response);

            case "createItem":
                return $this->handleCreateItem($response);

            case "createVariant":
                return $this->handleCreateVariant($response);

            case "updateVariant":
                return $this->handleUpdateVariant($response);

            case "removeVariant":
                return $this->handleRemoveVariant($response);

            case "createCategory":
                return $this->handleCreateCategory($response);

            case "updateCategory":
                return $this->handleUpdateCategory($response);

            case "removeCategory":
                return $this->handleRemoveCategory($response);

            case "uploadImage":
                return $this->handleUploadImage($response);

            case null:
            default:
                return $response->setError(Error::NonExistentMethod);

        }
    }

/**
 * API handler for token verify
 *
 *
 * @param  ApiResponse $response API request
 * @return ApiResponse API response
 */

    function handleVerify(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(['token']);

        $jwt = new JWTApi;

        if (!$jwt->validateToken($response)) {
            return $response;
        }

        $decodedToken = $jwt->decodeToken($response);

        if ($response->hasFailed()) {
            return $response;
        }

        $response->addPayload("newToken", $jwt->getToken($decodedToken->sub, $decodedToken->name));

        return $response->setSuccess(Success::Verification);
    }

/**
 * API handler for user registration
 *
 *
 * @param  ApiResponse $response API request
 * @return ApiResponse API response
 */

    function handleRegister(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["username", "password", "confirmPassword", "fullName", "email"]);
        $response->setPayloadKeys(["msg"]);

        $auth = new AuthApi;
        if ($response->hasRequestKeys()) {
            return $auth->register($response);
        }
        return $response;
    }

/**
 * API handler for user login
 *
 *
 * @param  ApiResponse $response API request
 * @return ApiResponse API response with JWT token
 */

    function handleLogin(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["username", "password"]);
        $response->setPayloadKeys(["token", "username", "isAdmin", "fullName", "email"]);

        $auth = new AuthApi;
        if ($response->hasRequestKeys()) {
            return $auth->login($response);
        }
        return $response;
    }

    /**
     * @todo cleanup
     * @param ApiResponse $response
     */
    function handleGetMenu(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys([]); // optional - "page", "itemsCount"
        $response->setPayloadKeys(["data"]);

        $queryResult = null;
        $categories = CategoryModel::getAll()->toArray();
        $backendUrl = EnvReader::getEnvProperty(Settings::UrlBackend);

        foreach ($categories as &$category) {
            $category["image"] = $backendUrl . "/image/categories/" . $category["id"];
        }

        $page = (int) $response->getRequestByKey("page");
        $itemsCount = (int) $response->getRequestByKey("itemsCount");

        if ($page > 0 && $itemsCount > 0) {
            if (!$queryResult = ItemModel::getAllByPage($page, $itemsCount)) {
                return $response->setError(Error::QueryFailed);
            }
        } else {
            if (!$queryResult = ItemModel::getAll()) {
                return $response->setError(Error::QueryFailed);
            }
        }

        $variants = VariantModel::getAll();

        // adding category list

        $response->addPayload("categoryList", $categories);

        $array = $queryResult->toArray();

        for ($i = 0; $i < sizeof($array); $i++) {
            $id = $array[$i]["id"];

            $array[$i]["variants"] = [];
            if (!$variants->where("itemId", "=", $id)->isEmpty()) {
                $array[$i]["variants"] = $variants->where("itemId", "=", $id)->toArray();
            }
            // parse allergens
            $alergenList = [];
            $alergens = json_decode($array[$i]["allergens"]);

            foreach ($alergens as $alergen) {
                $alergenList[] = ["id" => $alergen];
            }

            $array[$i]["allergens"] = $alergenList;

            $array[$i]["image"] = $backendUrl . "/image/items/" . $array[$i]['id'];

        }

        $response->setPayload("data", $array);

        // paging info

        $response->setPayload("itemsCount", ItemModel::countAll());

        $response->setStatus(true);
        return $response;
    }

    /**
     * @param ApiResponse $response
     */
    function handleGetOrders(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token"]); // optional - "page", "itemsCount", "isKDS"
        $response->setPayloadKeys(["data", "items"]);

        $jwt = new JWTApi;

        $page = (int) $response->getRequestByKey("page");
        $itemsCount = (int) $response->getRequestByKey("itemsCount");

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        $paymentTableName = PaymentModel::getTableName();
        $orderTableName = OrderModel::getTableName();

        if ($isAdmin) {
            if ($response->getRequestByKey("isKDS")) {
                $isKDS = (bool) $response->getRequestByKey("isKDS");
            } else {
                $isKDS = false;
            }
            if ($isKDS) {
                $orders = OrderModel::query()->where("paid", "=", 1)->where("status", "=", OrderStatus::Sent->value)->orWhere("status", "=", OrderStatus::Preparing->value)->orWhere("status", "=", OrderStatus::Waiting->value);
                error_log($orders->toSql());
            } else {
                $orders = OrderModel::getAll();
            }

        } else {
            $orders = OrderModel::getByUser((int) $uid);
        }

        if ($page > 0 && $itemsCount > 0) {
            if (!$orders->get()->isEmpty()) {
                $orders = $orders->select(["$orderTableName.*", "$paymentTableName.totalAmount", "$paymentTableName.paid", "$paymentTableName.thePayDetailsUrl"]);

                $paginate = $orders->orderBy($orderTableName . ".dateCreated", "desc")->paginate(perPage: $itemsCount, page: $page);
                $response->setPayload("itemsCount", $paginate->total());
                $ordersArray = $paginate->items();
            } else {
                return $response->setError(Error::QueryFailed);
            }
        } else {
            $response->setPayload("itemsCount", $orders->count());
            $ordersArray = $orders->select(["$orderTableName.*", "$paymentTableName.totalAmount", "$paymentTableName.paid", "$paymentTableName.thePayDetailsUrl"])->get()->toArray();
        }

        $itemIds = [];
        /**
         * @var array<int> $variantIds
         */
        $variantIds = [];

        foreach ($ordersArray as &$order) {
            // cast to array $paginate->items() - returns array<stdObj>
            if (is_object($order)) {
                $order = (array) $order;
            }

            $order["startTime"] = Carbon::createFromFormat("H:i:s", $order["startTime"])->format("H:i");
            $order["endTime"] = Carbon::createFromFormat("H:i:s", $order["endTime"])->format("H:i");

            $order["dateCreated"] = Carbon::createFromFormat("Y-m-d H:i:s", $order["dateCreated"])->setTimezone(CarbonTimeZone::create(EnvReader::getEnvProperty(Settings::Timezone)))->format("Y-m-d H:i");

            unset($order["paymentId"]);
            unset($order["userId"]);
            unset($order["thePayId"]);
            unset($order["thePayUrl"]);

            $order["items"] = json_decode($order["items"]);
//            var_dump($order["items"]);
            foreach ($order["items"] as &$item) {
                //var_dump((array) $item->variants);
                $variantIds = array_merge($variantIds, (array) $item->variants);
            }
            $orderitemIds = Collection::make($order["items"])->pluck("id")->toArray();
            array_push($itemIds, ...$orderitemIds);
        }

        $response->setPayload("data", $ordersArray);

        $itemIds = array_unique($itemIds);
        $variantIds = array_unique($variantIds);

        try {
            $items = ItemModel::getByIdArray($itemIds)->toArray();
        } catch (Exception $e) {
            if ($e->getCode() == 1) {
                return $response->setError(Error::MissingItems);
            }
        }

        try {
            if (!empty($variantIds)) {
                $variants = VariantModel::getByIdArray($variantIds)->toArray();
            }
        } catch (Exception $e) {
            if ($e->getCode() == 2) {
                return $response->setError(Error::InvalidVariant);
            }
        }

        if (!empty($items)) {
            $response->setPayload("items", $items);
        } else {
            $response->setPayload("items", []);
        }

        if (!empty($variants)) {
            $response->setPayload("variants", $variants);
        } else {
            $response->setPayload("variants", []);
        }
        $response->setStatus(true);
        return $response;
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleIsAdmin(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token"]);
        $response->setPayloadKeys(["isAdmin"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);
        $response->setPayload("isAdmin", $isAdmin);

        $response->setStatus(true);
        return $response;
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleCreateOrder(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "items", "startTime", "endTime", "pickUpDate", "paymentMethod"]);
        $response->setPayloadKeys(["msg", "url"]);

        // object declaration
        $jwt = new JWTApi;
        $orderApi = new OrderApi;

        // variable declaration
        $startTime = $response->getRequestByKey("startTime");
        $endTime = $response->getRequestByKey("endTime");
        $pickUpDate = $response->getRequestByKey("pickUpDate");

        $items = $response->getRequestByKey("items");

        // items checking
        foreach ($items as $item) {
            if (!isset($item["id"]) || !isset($item["quantity"]) || !isset($item["variants"])) {
                return $response->setError(Error::MissingItems);
            }
        }
        /**
         * @var array<array{id:int,quantity:int,variants:array<int>}>
         */
        $items = $items;

        $paymentMethod = $response->getRequestByKey("paymentMethod");

        // token validation
        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        // checking date validity
        $today = Carbon::now()->format("Y-m-d");

        if ($pickUpDate < $today) {
            return $response->setError(Error::DateTimeInvalid);
        }

        // checking for timeslot existence
        if (!TimeslotModel::timeslotExists($startTime, $endTime)) {
            return $response->setError(Error::NonexistentTimeslot);
        } else {
            $limit = TimeslotModel::getLimit($startTime, $endTime);
        }

        // order creation logic
        if ($isAdmin) {
            return $response->setError(Error::CannotOrderAsAdmin);
        } else {
            if (!$orderApi->isFree($startTime, $endTime, $pickUpDate, $limit)) {
                return $response->setError(Error::OrderTimeslotsFull);
            }
            try {
                $order = OrderModel::createOrder($uid, OrderStatus::Sent, $pickUpDate, $items, $paymentMethod, $startTime, $endTime);
            } catch (OutOfOrderIdsException $e) {
                return $response->setError(Error::OutOfOrderIds);
            } catch (RuntimeException $e) {
                error_log($e->getMessage());
                return $response->setError(Error::ThePayError);
            } catch (PaymentCreationException $e) {
                return $response->setError(Error::PaymentCreationError);
            } catch (Exception $e) {
                switch ($e->getCode()) {
                    case 1:
                        return $response->setError(Error::MissingItems);
                    case 2:
                        return $response->setError(Error::InvalidVariant);
                    case 3:
                        return $response->setError(Error::DuplicateExclusiveVariantSelected);
                    default:
                        return $response->setError(Error::OrderCreationError);
                }
            }
        }
        try {
            $orderApi->generateTemp();
        } catch (NegativeValueException $e) {
            /**
             * @todo handle exception
             */
        }

        $response->setPayload("url", $order["url"]);

        $order["items"] = json_decode($order["items"]);

        if ($paymentMethod == PaymentMethods::Cash->value) {
            WebsocketClient::send("kds", json_encode(["requestType" => "publish", "token" => JWTApi::getAdminToken(), "eventType" => EventTypes::CreateOrder, "payload" => $order]));
        }

        return $response->setStatus(true)->setSuccess(Success::OrderCreated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    public function handleUpdateOrder(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "orderId"]);

        $jwt = new JWTApi;
        $orderApi = new OrderApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        $isAdmin = UserModel::isAdmin($uid);

        $orderId = (int) $response->getRequestByKey("orderId");
        if ($orderId === 0 || OrderModel::query()->find($orderId)->exists == false) {
            return $response->setError(Error::OrderIdNotFound);
        }

        if ($isAdmin) {
            $orderParameters = [];
            foreach (OrderModel::getColumns() as $column) {
                if ($response->hasRequestByKey($column)) {
                    $orderParameters["$column"] = $response->getRequestByKey($column);
                }
            }
            try {
                $orderApi->updateOrder($orderId, $orderParameters);
            } catch (\Exception $e) {
                switch ($e->getCode()) {
                    case 1:
                        return $response->setError(Error::OrderIdNotFound);
                    case 2:
                        return $response->setError(Error::InvalidStatus);
                    case 3:
                        return $response->setError(Error::UserNotFound);
                    case 4:
                        return $response->setError(Error::InvalidPickupId);

                }
                return $response->setError(Error::GeneralError);
            }

        } else { // user update
            $order = OrderModel::query()->where("id", $orderId);
            $orderItems = $order->get()->toArray()[0];

            if ($orderItems["userId"] != $uid) {
                return $response->setError(Error::Unauthorized);
            }

            if ($response->hasRequestByKey("status")) {
                $response->getRequestByKey("status");

                $status = $orderItems["status"];

                if ($status == OrderStatus::Sent->value) {
                    $order->find($orderId)->update(["status" => OrderStatus::Storno->value]);
                } else {
                    return $response->setError(Error::InvalidStatus);
                }
            } else {
                return $response->setError(Error::MissingStatus);
            }

        }

        $updatedOrder = OrderModel::getById($orderId);
        $updatedOrder["id"] = $orderId;
        $updatedOrder["items"] = json_decode($updatedOrder["items"]);

        $ws = [
            "requestType" => "publish",
            "token" => JWTApi::getAdminToken(),
            "eventType" => EventTypes::UpdateOrder,
            "orderId" => $orderId,
            "payload" => $updatedOrder
        ];

        WebsocketClient::send("kds", json_encode($ws));
        return $response->setSuccess(Success::OrderUpdated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    public function handleUpdatePayment(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "type", "paymentId"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        $isAdmin = UserModel::isAdmin($uid);

        if (!$isAdmin) {
            return $response->setError(Error::Unauthorized);
        }

        $paymentId = (int) $response->getRequestByKey("paymentId");
        $type = $response->getRequestByKey("type");

        if ($type !== "state_changed") {
            return $response->setError(Error::InvalidType);
        }
        $paymentApi = new PaymentApi;

        if ($paymentId !== 0 && $paymentApi->isPaid($paymentId)) {

            try {
                PaymentModel::setPaid($paymentId);
            } catch (\Exception $e) {
                if ($e->getCode() === 1) {
                    return $response->setError(Error::PaymentNotFound);
                }
            }

        } else {
            return $response->setError(Error::InvalidPaymentId);
        }

        return $response->setSuccess(Success::PaymentUpdated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleUpdateUser(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if ($response->hasRequestByKey("fullName")) {
            if ($response->getRequestByKey("fullName") != "") {
                UserModel::query()->where("id", $uid)->update(["fullName" => $response->getRequestByKey("fullName")]);
            }
        }
        if ($response->hasRequestByKey("tel")) {
            if ($response->getRequestByKey("tel") != "" && preg_match('/^\+?[1-9]\d{1,14}$/', $response->getRequestByKey("tel")) === 1) {
                UserModel::query()->where("id", $uid)->update(["tel" => $response->getRequestByKey("tel")]);
            }
        }
        if ($response->hasRequestByKey("email")) {
            if ($response->getRequestByKey("email") != "" && filter_var($response->getRequestByKey("email"), FILTER_VALIDATE_EMAIL)) {
                UserModel::query()->where("id", $uid)->update(["email" => $response->getRequestByKey("email")]);
            }
        }

        return $response->setStatus(true)->setSuccess(Success::UserUpdated);
    }

/**
 * @param  ApiResponse   $response
 * @return ApiResponse
 */
    function handleUpdatePassword(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "password", "newPassword"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        $password = $response->getRequestByKey("password");
        $newPassword = $response->getRequestByKey("newPassword");

        if (!isset($newPassword) || $newPassword == "" || !isset($password) || $password == "") {
            return $response->setError(Error::InvalidPassword);
        }

        if (password_verify($password, UserModel::getPasswordById($uid))) {
            UserModel::query()->where("id", $uid)->update(["password" => password_hash($newPassword, PASSWORD_DEFAULT)]);
        } else {
            return $response->setError(Error::WrongPassword);
        }

        return $response->setStatus(true)->setSuccess(Success::PasswordUpdated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */

    function handleUpdateSetting(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "setting", "value"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        $settingKey = $response->getRequestByKey("setting");
        $settingValue = $response->getRequestByKey("value");

        if (!isset($settingKey) || $settingKey == "" || !isset($settingValue) || $settingValue == "") {
            return $response->setError(Error::InvalidSetting);
        }

        try {
            $setting = Settings::from($settingKey);
        } catch (ValueError $e) {
            return $response->setError(Error::InvalidSetting);
        } catch (TypeError $e) {
            return $response->setError(Error::InvalidSetting);
        }

        EnvWriter::write($setting, $settingValue);

        return $response->setSuccess(Success::SettingUpdated);
    }

/**
 * @param  ApiResponse   $response
 * @return ApiResponse
 */

    function handleUpdateItem(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "itemId"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        if (!$response->hasRequestByKey("itemId")) {
            return $response->setError(Error::MissingItemId);
        }
        $itemId = (int) $response->getRequestByKey("itemId");

        if (!ItemModel::exists($itemId)) {
            return $response->setError(Error::ItemNotFound);
        }

        $itemParameters = [];
        foreach (ItemModel::getColumns() as $column) {
            if ($response->hasRequestByKey($column)) {
                $itemParameters["$column"] = $response->getRequestByKey($column);
            }
        }
        if (!empty($itemParameters)) {
            ItemModel::query()->where("id", $itemId)->update($itemParameters);
        }

        return $response->setSuccess(Success::ItemUpdated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleRemoveItem(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "itemId"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        if (!$response->hasRequestByKey("itemId")) {
            return $response->setError(Error::MissingItemId);
        }
        $itemId = (int) $response->getRequestByKey("itemId");

        if (!ItemModel::exists($itemId)) {
            return $response->setError(Error::ItemNotFound);
        }

        ItemModel::query()->where("id", $itemId)->delete();

        return $response->setSuccess(Success::ItemRemoved);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleCreateItem(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(array_merge(["token"], ItemModel::getColumns()));

        if (!$response->hasRequestKeys()) {
            return $response;
        }

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }
        $itemParameters = [];
        foreach (ItemModel::getColumns() as $column) {
            if ($response->hasRequestByKey($column)) {
                $itemParameters["$column"] = $response->getRequestByKey($column);
            } else {
                return $response;
            }
        }
        ItemModel::query()->create($itemParameters);

        return $response->setSuccess(Success::ItemCreated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    public function handleCreateVariant(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "itemId", "name", "addedPrice", "isExclusive"]);

        if (!$response->hasRequestKeys()) {
            return $response;
        }

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        $itemId = (int) $response->getRequestByKey("itemId");
        $name = (string) $response->getRequestByKey("name");
        $addedPrice = (int) $response->getRequestByKey("addedPrice");
        $isExclusive = (bool) $response->getRequestByKey("isExclusive");

        if (!ItemModel::exists($itemId)) {
            return $response->setError(Error::ItemIdNotFound);
        }

        try {
            VariantModel::createVariant($itemId, $name, $addedPrice, $isExclusive);
        } catch (\Exception $e) {
            return $response->setError(Error::VariantCreationFailed);
        }

        return $response->setSuccess(Success::VariantCreated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    public function handleUpdateVariant(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "variantId"]);

        if (!$response->hasRequestKeys()) {
            return $response;
        }

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        if (!$response->hasRequestByKey("variantId")) {
            return $response->setError(Error::MissingVariantId);
        }

        $variantId = (int) $response->getRequestByKey("variantId");

        if (!VariantModel::exists($variantId)) {
            return $response->setError(Error::VariantNotFound);
        }

        $variantParameters = [];
        foreach (VariantModel::getColums() as $column) {
            if ($response->hasRequestByKey($column)) {
                $variantParameters["$column"] = $response->getRequestByKey($column);
            }
        }
        if (!empty($variantParameters)) {
            VariantModel::query()->where("id", $variantId)->update($variantParameters);
        }

        return $response->setSuccess(Success::VariantUpdated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleRemoveVariant(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "variantId"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        if (!$response->hasRequestByKey("variantId")) {
            return $response->setError(Error::MissingVariantId);
        }

        $variantId = (int) $response->getRequestByKey("variantId");

        if (!VariantModel::exists($variantId)) {
            return $response->setError(Error::VariantNotFound);
        }

        VariantModel::query()->where("id", $variantId)->delete();

        return $response->setSuccess(Success::VaraintRemoved);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleCreateCategory(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "name", "description"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!$response->hasRequestKeys()) {
            return $response->setError(Error::MissingPayloadKeys);
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        $category["name"] = $response->getRequestByKey("name");
        $category["description"] = $response->getRequestByKey("description");

        CategoryModel::query()->create($category);

        return $response->setSuccess(Success::CategoryCreated);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */

    function handleRemoveCategory(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "categoryId"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }

        if (!UserModel::isAdmin($uid)) {
            return $response->setError(Error::Unauthorized);
        }

        if (!$response->hasRequestByKey("categoryId")) {
            return $response->setError(Error::MissingCategoryId);
        }

        $categoryId = (int) $response->getRequestByKey("categoryId");

        if (!CategoryModel::exists($categoryId)) {
            return $response->setError(Error::CategoryNotFound);
        }

        CategoryModel::query()->where("id", $response->getRequestByKey("categoryId"))->update(["removed" => true]);

        return $response->setSuccess(Success::CategoryRemoved);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */

    function handleUpdateCategory(ApiResponse $response): ApiResponse
    {
        {
            $response->setRequestKeys(["token", "categoryId"]);

            if (!$response->hasRequestKeys()) {
                return $response;
            }

            $jwt = new JWTApi;

            $jwt->validateToken($response);

            $uid = $jwt->decodeToken($response)->sub ?? 0;

            if ($response->hasFailed()) {
                return $response;
            }

            if (!UserModel::isAdmin($uid)) {
                return $response->setError(Error::Unauthorized);
            }

            if (!$response->hasRequestByKey("categoryId")) {
                return $response->setError(Error::MissingVariantId);
            }

            $categoryId = (int) $response->getRequestByKey("categoryId");

            if (!CategoryModel::exists($categoryId)) {
                return $response->setError(Error::CategoryNotFound);
            }

            $categoryParameters = [];
            foreach (CategoryModel::getColums() as $column) {
                if ($response->hasRequestByKey($column)) {
                    $categoryParameters["$column"] = $response->getRequestByKey($column);
                }
            }
            if (!empty($categoryParameters)) {
                CategoryModel::query()->where("id", $categoryId)->update($categoryParameters);
            }

            return $response->setSuccess(Success::CategoryUpdated);
        }
    }

    /**
     * @param ApiResponse $response
     */
    function handleGenerateTimeslots(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "startTime", "endTime", "interval", "limit"]);

        $response->setRequestByKey("clear", (bool) $response->getRequestByKey("clear"));

        $jwt = new JWTApi;
        $orderApi = new OrderApi;

        $startTime = $response->getRequestByKey("startTime");
        $endTime = $response->getRequestByKey("endTime");
        $interval = (int) $response->getRequestByKey("interval");
        $limit = (int) $response->getRequestByKey("limit");
        $clear = (bool) $response->getRequestByKey("clear");

        if ($interval <= 0 || $limit <= 0) {
            $response->setError(Error::InvalidLimitOrInterval);
        }

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        if (!$isAdmin) {
            return $response->setError(Error::Unauthorized);
        }

        try {
            $orderApi->generateTimeslots($startTime, $endTime, $interval, $limit, $clear);
        } catch (DateException $e) {
            $response->setError(Error::DateTimeInvalid);
        } catch (NegativeValueException $e) {
            $response->setError(Error::DateTimeInvalid);
        }

        $response->setStatus(true);
        $response->setSuccess(Success::GenerateTimeslots);
        return $response;
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleGenerateTemp(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token"]);

        $jwt = new JWTApi;
        $order = new OrderApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        if (!$isAdmin) {
            return $response->setError(Error::Unauthorized);
        }

        try {
            $order->generateTemp();
        } catch (NegativeValueException $e) {
            $response->setError(Error::InvalidOrderDateLimitMax);
        }
        $response->setSuccess(Success::GenerateTemp);

        return $response->setStatus(true);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleGetOrderTimeTable(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys([]);

        if ($response->hasFailed()) {
            return $response;
        }

        if (TempModel::isOutdated()) {
            (new OrderApi)->generateTemp();
        }

        $data = TempModel::getFormatedArray();
        $response->setPayload("data", $data);
        return $response->setStatus(true);
    }

    /**
     * @param  ApiResponse   $response
     * @return ApiResponse
     */
    function handleUploadImage(ApiResponse $response): ApiResponse
    {
        $imageUploader = new ImageUploader;

        //$imageUploader->uploadImage()
        return $response->setStatus(true);
    }

    /**
     * @param  ApiResponse   $reponse
     * @return ApiResponse
     */
    function handleMakeOrderEvent(ApiResponse $reponse): ApiResponse
    {
        WebsocketClient::send("kds", json_encode(["requestType" => "publish", "eventType" => "updateOrder", "payload" => "{order here}"]));
        return $reponse->setStatus(true);
    }

/**
 * API handler for data transit testing
 *
 *
 * @param  ApiResponse $response API request
 * @return ApiResponse copy of the request
 */

    function handleTest(ApiResponse $response): ApiResponse
    {
        $request = $response->getRequest();

        foreach ($request as $key => $value) {
            $response->addPayload($key, $value);
        }
        $response->setStatus(true);
        return $response;
    }

/**
 * Utility function for checking if all keys are present and carry data
 * @deprecated
 * @param  array<mixed> $request API request
 * @param  array<mixed> $members list of all the required members
 * @return bool|error   if members missing kills the process and sends error otherwise true
 */

    function hasAllMembers($request, $members)
    {
        foreach ($members as $member) {
            if (!isset($request[$member]) || empty($request[$member])) {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'error' => "missing field: " . $member]);
                die;
            }
        }
        return true;
    }

/**
 * Utility function for retrieving data
 *
 * Retrieves json data from POST method raw data and returns decode json
 *
 * @return array<mixed> decoded json from POST raw data
 */
    function getPostJson()
    {
        $request = $this->requestInterface;
        //$data = $request->getParsedBody();

        if ($request->getUploadedFiles()) {
            $data = $request->getParsedBody();
        } else {
            $data = (array) json_decode($request->getBody()->getContents());
        }
        /**
         * @deprecated legacy code
         */ 
        /*$post = file_get_contents('php://input');
        $json = json_decode($post, true);*/
        
        return $data;
    }
}
