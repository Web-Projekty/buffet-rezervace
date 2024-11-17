<?php

use Buffet\Api\BuffetApi;
use Buffet\Api\ImageProvider;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
//require __DIR__ . '/src/Database/config.php'; // Databse config file

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$app->get('/', function (Request $request, Response $response, $args) {

    ob_start();
    //phpinfo();
    include __DIR__ . "/templates/test.html";
    $html = ob_get_clean();

    $response->getBody()->write($html);
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

// CORS Middleware (DO NOT!!!! LEAVE IN FINAL RELEASE)e
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

$app->run();
