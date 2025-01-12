<?php

use Buffet\Api\BuffetApi;
use Buffet\Api\ImageProvider;
use Buffet\Api\PaymentApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\PaymentModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Exceptions\SettingsException;
use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
//require __DIR__ . '/src/Database/config.php'; // Databse config file

$app = AppFactory::create();
$isProd = true;
try {
    if (EnvReader::getEnvProperty(Settings::IsProd) !== null) {
        $isProd = EnvReader::getEnvProperty(Settings::IsProd);
    }
} catch (SettingsException $e) {
    $isProd = true;
}
$app->addErrorMiddleware(!$isProd, true, true);

$app->get('/', function (Request $request, Response $response, $args) {

    ob_start();
    //phpinfo();
    include __DIR__ . "/templates/test.html";
    $html = ob_get_clean();

    $response->getBody()->write($html);
    return $response;
});

$app->get('/pay', function (Request $request, Response $response, $args) {
    $response = new ApiResponse();
    $dbMan = new DatabaseManager($response);
    $dbMan->setupConnection();
    $paymetns = PaymentModel::query()->where('paid', 0)->get()->toArray();
    foreach ($paymetns as $payment) {
        $paymentApi = new PaymentApi();
        $paymentApi->getPaymentInfo($payment['thePayId']);
    }
});

$app->get('/return', function (Request $request, Response $response, $args) {
    error_log($request->getBody());
    /*error_log(sprintf("Headers: %s", $request->getHeaders()));
    error_log(sprintf("Query: %s", $request->getQueryParams()));
    error_log(sprintf("POST: %s", $request->getParsedBody()));
    error_log(sprintf("Args: %s", $args));*/
    if ($request->getParsedBody()) {

        foreach ($request->getParsedBody() as $key => $value) {
            error_log(sprintf("POST %s: %s", $key, $value));
        }
    }

    if ($request->getQueryParams()) {

        foreach ($request->getQueryParams() as $key => $value) {
            error_log(sprintf("QUERY %s: %s", $key, $value));
        }
    }

    foreach ($request->getHeaders() as $key => $value) {
        error_log(sprintf("HEADER %s: %s", $key, $value[0]));
    }

    foreach ($args as $key => $value) {
        error_log(sprintf("ARG %s: %s", $key, $value));
    }
    return $response;
});

$app->get('/cred', function (Request $request, Response $response, $args) {

    ob_start();
    include __DIR__ . "/templates/creds.html";
    $html = ob_get_clean();

    $response->getBody()->write($html);
    return $response;
});

### Deprecated ###

/*$app->post('/credGen', function (Request $request, Response $response, $args) {

ob_start();
$cred = new CredentialsManager;
$cred->createCredentials($_POST['username'], $_POST['password']);
$html = ob_get_clean();

$response->getBody()->write($html);
return $response;
});*/

// CORS Middleware (DO NOT!!!! LEAVE IN FINAL RELEASE)
$corsMiddleware = function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Credentials', 'true'); // If needed
};

// Add middleware to your Slim app
$app->add($corsMiddleware);

$app->post('/api', [BuffetApi::class, 'main']);

$app->any('/image/{path:.*}', [ImageProvider::class, 'main']);

$app->get('/chat', function (Request $request, Response $response, $args) {

    ob_start();
    include __DIR__ . "/templates/ws.html";
    $response->getBody()->write(ob_get_clean());
    return $response;
});

$app->get('/wstest', function (Request $request, Response $response, $args) {
    $connector = new Ratchet\Client\Connector();

    $connector('ws://localhost:8069/ok') // Specify the WebSocket server address
        ->then(function ($conn) {
            echo "Connected to WebSocket server\n";

            // Send a message
            $conn->send('Hello, WebSocket Server!');

            // Close the connection after sending the message
            $conn->close();
        }, function ($e) {
            echo "Could not connect: {$e->getMessage()}\n";
        });
    return $response;
});

$app->run();
