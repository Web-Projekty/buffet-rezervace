<?php

use Buffet\Api\BuffetApi;
use Buffet\Database\CredentialsManager;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

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
$app->post('/credGen', function (Request $request, Response $response, $args) {

    ob_start();
    $cred = new CredentialsManager;
    $cred->createCredentials($_POST['username'],$_POST['password']);
    $html = ob_get_clean();

    $response->getBody()->write($html);
    return $response;
});

$app->post('/api', [BuffetApi::class, 'main']);

$app->run();
