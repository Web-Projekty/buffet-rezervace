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
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\EventTypes;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Exceptions\OutOfOrderIdsException;
use Buffet\Types\Exceptions\PaymentCreationException;
use Buffet\Types\Exceptions\SettingsException;
use Buffet\Types\OrderStatus;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvReader;
use Buffet\Utils\HttpClient;
use Buffet\Utils\WebsocketClient;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use DateException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use RuntimeException;

class BuffetApi
{

    /**
     * Main API function called by router.
     *
     * Handles api request calls
     *
     * @param  RequestInterface  $request
     * @param  ResponseInterface $html
     * @return ResponseInterface html code
     */

    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
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
        $paymentUid = $query["paymen_uid"];
        $projectId = $query["project_id"];

        $token = JWTApi::getAdminToken();

        $msg = [
            "requestType" => "updatePayment",
            "token" => $token,
            "type" => $type,
            "paymentId" => $paymentUid
        ];

        error_log(HttpClient::post("http://localhost/api", json_encode($msg)));

        foreach ($request->getQueryParams() as $key => $param) {
            error_log("Key: " . $key . "Param: " . $param);
        }
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
        $response->setRequestKeys(["username", "password", "passwordConfirm", "fullName", "email", "tel"]);
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

        foreach ($categories as &$category) {
            $category["image"] = "https://wlczak.vlastas.cc/backend/image/categories/" . $category["id"];
            //var_dump($category);
        }

        //var_dump($categories);

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

        // adding category list

        $response->addPayload("categoryList", $categories);

        $array = $queryResult->toArray();
        for ($i = 0; $i < sizeof($array); $i++) {
            // parse allergens
            $alergenList = [];
            $alergens = json_decode($array[$i]["allergens"]);

            foreach ($alergens as $alergen) {
                $alergenList[] = ["id" => $alergen];
            }

            $array[$i]["allergens"] = $alergenList;

            // add image
            $array[$i]["image"] = "https://wlczak.vlastas.cc/backend/image/items/" . $array[$i]['id'];
            //$array[$i]["image"] = "http://localhost:8080/image/items/" . $array[$i]['id'];

            // get category name
            //$array[$i]["categoryName"] = $getName($array[$i]["category"], $categories);
            //  $array[$i]["image"] = "http://localhost:8080/image/items/" . $array[$i]['id'];
        }

        //var_dump($array);

        $response->setPayload("data", $array);

        // paging info

        $response->setPayload("itemsCount", ItemModel::countAll());

        /* // production
        $response->setPayload("menuItems", $queryResult->toArray());
         */

        $response->setStatus(true);
        return $response;
    }

    /**
     * @param ApiResponse $response
     */
    function handleGetOrders(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token"]); // optional - "page", "itemsCount"
        $response->setPayloadKeys(["data"]);

        $jwt = new JWTApi;

        $page = (int) $response->getRequestByKey("page");
        $itemsCount = (int) $response->getRequestByKey("itemsCount");

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        if ($isAdmin) {
            $orders = OrderModel::getAll();
        } else {
            $orders = OrderModel::getByUser((int) $uid);
        }

        if ($page > 0 && $itemsCount > 0) {
            if ($orders) {
                $paginate = $orders->getQuery()->orderBy("dateCreated", "desc")->paginate(perPage: $itemsCount, page: $page);
                $response->setPayload("itemsCount", $paginate->total());
                $ordersArray = $paginate->items();
                $response->setPayload("data", $ordersArray);
            } else {
                return $response->setError(Error::QueryFailed);
            }
        } else {
            $response->setPayload("itemsCount", OrderModel::query()->count());
            $ordersArray = $orders->get()->toArray();
        }
        foreach ($ordersArray as &$order) {
            // cast to array $paginate->items() - returns array<stdObj>
            if (is_object($order)) {
                $order = (array) $order;
            }
            //var_dump($order);
            $order["startTime"] = Carbon::createFromFormat("H:i:s", $order["startTime"])->format("H:i");
            $order["endTime"] = Carbon::createFromFormat("H:i:s", $order["endTime"])->format("H:i");
            //var_dump(new DateTimeZone());
            $order["dateCreated"] = Carbon::createFromFormat("Y-m-d H:i:s", $order["dateCreated"])->setTimezone(CarbonTimeZone::create(EnvReader::getEnvProperty(Settings::Timezone)))->format("Y-m-d H:i");
        }

        $response->setPayload("data", $ordersArray);

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

        WebsocketClient::send("kds", json_encode(["requestType" => "publish", "token" => JWTApi::getAdminToken(), "eventType" => EventTypes::CreateOrder, "payload" => $order]));

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

        if (!$isAdmin) {
            return $response->setError(Error::Unauthorized);
        }

        $orderId = (int) $response->getRequestByKey("orderId");
        if ($orderId === 0) {
            return $response->setError(Error::OrderIdNotFound);
        }

        $orderParameters = [];
        foreach (OrderModel::getCollumns() as $column) {
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

        $updatedOrder = OrderModel::getById($orderId);
        $updatedOrder["id"] = $orderId;

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
        
        PaymentModel::setPaid($paymentId);

        return $response;
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
    public function handleGenerateTemp(ApiResponse $response): ApiResponse
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
    public function handleGetOrderTimeTable(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys([]);

        if ($response->hasFailed()) {
            return $response;
        }
        $data = TempModel::getFormatedArray();
        $response->setPayload("data", $data);
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
        $post = file_get_contents('php://input');
        $json = json_decode($post, true);
        return $json;
    }
}
