<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Api\AuthApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\CategoryModel;
use Buffet\Database\Models\ItemModel;
use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Success;
use Buffet\Utils\WebsocketClient;
use DateException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;

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
        /**
         * @var ApiResponse
         */
        $response = $this->handleApiCall();

        if ($response == null || get_class($response) != "Buffet\Types\ApiResponse") {
            $response = new ApiResponse();
            $response->setError(Error::InvalidDataType);
        }

        $JsonOut = (string) $response;

        $html->getBody()->write((string) $JsonOut);

        return $html->withHeader('Content-type', 'application/json');
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

            case "generateTimeslots":
                return $this->handleGenerateTimeslots($response);

            case "makeOrderEvent":
                return $this->handleMakeOrderEvent($response);

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
        $response->setRequestKeys(["username", "password"]);
        $response->setPayloadKeys(["msg"]);

        $auth = new AuthApi;
        if ($response->hasRequestKeys()) {
            return $auth->register($response);
        }
        return $response;
    }

/**
 * API handler for user lgoin
 *
 *
 * @param  ApiResponse $response API request
 * @return ApiResponse API response with JWT token
 */

    function handleLogin(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["username", "password"]);
        $response->setPayloadKeys(["token", "username", "isAdmin", "fullName", "email", "class"]);

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
        $response->setRequestKeys(["page", "itemsCount"]);
        $response->setPayloadKeys(["data"]);

        $queryResult = null;
        $categories = CategoryModel::getAll()->toArray();

        //var_dump($categories);

        $page = (int) $response->getRequestByKey("page");
        $itemsCount = (int) $response->getRequestByKey("itemsCount");

        if (!$queryResult = ItemModel::getAllByPage($page, $itemsCount)) {
            return $response->setError(Error::QueryFailed);
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

            // get category name
            //$array[$i]["categoryName"] = $getName($array[$i]["category"], $categories);
            $array[$i]["image"] = "https://wlczak.vlastas.cc/backend/image/items/" . $array[$i]['id'];
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
        $response->setRequestKeys(["token"]);
        $response->setPayloadKeys(["data"]);

        $jwt = new JWTApi;

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        if ($isAdmin) {
            $response->setPayload("data", OrderModel::getAll());
        } else {
            $response->setPayload("data", OrderModel::getByUser((int) $uid));
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

        $uid = $jwt->decodeToken($response)->sub;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);
        $response->setPayload("isAdmin", $isAdmin);

        $response->setStatus(true);
        return $response;
    }

    /**
     * @param ApiResponse $response
     */
    function handleGenerateTimeslots(ApiResponse $response): ApiResponse
    {
        $response->setRequestKeys(["token", "startTime", "endTime", "interval", "limit"]);

        $jwt = new JWTApi;
        $orderApi = new OrderApi;

        $startTime = $response->getRequestByKey("startTime");
        $endTime = $response->getRequestByKey("endTime");
        $interval = (int) $response->getRequestByKey("interval");
        $limit = (int) $response->getRequestByKey("limit");

        if ($interval <= 0 || $limit <= 0) {
            $response->setError(Error::InvalidLimitOrInterval);
        }

        $jwt->validateToken($response);

        $uid = $jwt->decodeToken($response)->sub ?? 0;

        if ($response->hasFailed()) {
            return $response;
        }
        $isAdmin = UserModel::isAdmin($uid);

        try {
            $orderApi->generateTimeslots($startTime, $endTime, $interval, $limit);
        } catch (DateException $e) {
            $response->setError(Error::DateTimeInvalid);
        } catch (NegativeValueException $e) {
            $response->setError(Error::DateTimeInvalid);
        }

        return $response;
    }

    /**
     * @param  ApiResponse   $reponse
     * @return ApiResponse
     */
    function handleMakeOrderEvent(ApiResponse $reponse): ApiResponse
    {
        WebsocketClient::send("kds", json_encode(["requestType" => "publish"]));
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
