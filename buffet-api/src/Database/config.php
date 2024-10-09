<?php

use Buffet\Database\CredentialsManager;
use Illuminate\Database\Capsule\Manager as Capsule;

require 'vendor/autoload.php'; // Ensure Composer autoload is included

$manager = new CredentialsManager;

$creds = $manager->getCredentials();

/**if ($credentials['success'] == true) {

$db_host = $credentials['db_host'];
$db_user = $credentials['db_user'];
$db_pass = $credentials['db_pass'];
$db_name = $credentials['db_name'];

$this->conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
} else {
header('Content-Type: application/json');
echo json_encode(['success' => false, 'error' => "credentials decrypt error"]);
die;
} */

// Eloquent ORM Capsule setup
$capsule = new Capsule;

$capsule->addConnection([
    'driver' => 'mysql',
    'host' => $creds['db_host'],
    'database' => $creds['db_name'],
    'username' => $creds['db_user'],
    'password' => $creds['db_pass'],
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_czech_ci',
    'prefix' => ''
]);

// Make the Capsule instance available globally via static methods
$capsule->setAsGlobal();

// Setup the Eloquent ORM
$capsule->bootEloquent();
