<?php

use Buffet\Api\BuffetApi;
use Buffet\Api\ImageProvider;
use Buffet\Api\ImageUploader;
use Buffet\Types\Exceptions\SettingsException;
use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Factory\ServerRequestFactory;

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

if (!$isProd) {
    $app->get('/debug', function (Request $request, Response $response, $args) {

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

    $app->any('/imgup', function (Request $request, Response $response, $args) {
        ob_start();
        include __DIR__ . "/templates/img.html";
        $response->getBody()->write(ob_get_clean());
        return $response;
    });
}
### I have no idea what I wanted to do with this
/*$app->get('/pay', function (Request $request, Response $response, $args) {
$response = new ApiResponse();
$dbMan = new DatabaseManager($response);
$dbMan->setupConnection();
$paymetns = PaymentModel::query()->where('paid', 0)->get()->toArray();
foreach ($paymetns as $payment) {
$paymentApi = new PaymentApi();
$paymentApi->getPaymentInfo($payment['thePayId']);
}
});*/

/**
 * @todo remove
 */
// CORS Middleware (DO NOT!!!! LEAVE IN FINAL RELEASE)
if (!$isProd) {
    $corsMiddleware = function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true'); // If needed
    };
    $app->add($corsMiddleware);

}

$headerMiddleware = function ($request, $handler) {
    $html = $handler->handle($request);
    $build_file = __DIR__ . "/../../build_date";
    if (file_exists($build_file)) {
        $fileStream = fopen($build_file, "r");
        $buildDate = trim(fread($fileStream, filesize($build_file)));
        fclose($fileStream);

        $buildDate = Carbon::createFromFormat('D M d H:i:s e Y', $buildDate)->setTimezone(CarbonTimeZone::create(EnvReader::getEnvProperty(Settings::Timezone)))->format('D M d H:i:s e Y');

        $html = $html->withAddedHeader("Build-date", $buildDate);
        $html = $html->withAddedHeader("Image-version", "production");

    } else {
        $headFile = __DIR__ . "/.git/HEAD";
        $fileStream = fopen($headFile, "r");

        $HEAD = fread($fileStream, filesize($headFile));
        fclose($fileStream);
        $HEAD = explode(" ", $HEAD);

        $refFile = __DIR__ . "/.git/" . trim($HEAD[1]);

        if (file_exists($refFile)) {
            $modifiedTimestamp = filemtime($refFile);
            $lastModified = Carbon::createFromTimestamp($modifiedTimestamp)->setTimezone(CarbonTimeZone::create(EnvReader::getEnvProperty(Settings::Timezone)))->format('Y-m-d H:i:s');
            $fileStream = fopen($refFile, "r");
            $commitId = fread($fileStream, filesize($refFile));
            fclose($fileStream);
        }

        if (isset($commitId)) {
            $html = $html->withAddedHeader("Dev-commit-id", trim($commitId));
        }
        if (isset($lastModified) && Carbon::createFromFormat('Y-m-d H:i:s', $lastModified)->isValid()) {
            $html = $html->withAddedHeader("Dev-last-commit", $lastModified);
        }
        $html = $html->withAddedHeader("Image-version", "development");
    }

    return $html;
};

$app->add($headerMiddleware);

// Add middleware to your Slim app

$app->post('/api', [BuffetApi::class, 'main']);
$app->post('/api/', [BuffetApi::class, 'main']);

$app->get('/api/notification', [BuffetApi::class, 'handleThePayNotification']);
$app->post('/api/upload', [ImageUploader::class, 'uploadImage']);

$app->any('/image/{path:.*}', [ImageProvider::class, 'main']);

$app->map(["GET"], "{routes:.+}", function (Request $request, Response $response, $args) {

    if (!file_exists(__DIR__ . "/dist/") || !file_exists(__DIR__ . "/dist/index.html")) {
        throw new HttpNotFoundException(ServerRequestFactory::createFromGlobals(), 1);
    }

    $requestPath = $request->getUri()->getPath();

    if (isset(explode(".", $requestPath)[1])) {
        $filePath = __DIR__ . "/dist/" . $request->getUri()->getPath();

        if (is_file($filePath)) {
            if (explode(".", $requestPath)[1] == "js") {
                $contentType = 'application/javascript';
            } elseif (explode(".", $requestPath)[1] == "css") {
                $contentType = 'text/css';
            } else {
                $contentType = mime_content_type($filePath);
            }
            $response->getBody()->write(file_get_contents($filePath));
        } else {
            throw new HttpNotFoundException(ServerRequestFactory::createFromGlobals(), 1);
        }

        return $response->withHeader('Content-Type', $contentType);
    } else {
        ob_start();
        include __DIR__ . "/dist/index.html";
        $html = ob_get_clean();

        $response->getBody()->write($html);
    }

    return $response;
});

$app->run();
