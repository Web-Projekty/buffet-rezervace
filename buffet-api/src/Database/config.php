<?php

use Buffet\Database\CredentialsManager;
use Illuminate\Database\Capsule\Manager as Capsule;

require 'vendor/autoload.php'; // Ensure Composer autoload is included

$manager = new CredentialsManager;

$creds = $manager->getCredentials();

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
