<?php

declare (strict_types = 1);

namespace Buffet\Database;

use Buffet\Database\CredentialsManager;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Illuminate\Database\Capsule\Manager as Capsule;

class DatabaseManager
{
    private CredentialsManager $credentialsManager;
    /**
     * @var mixed
     */
    private $capsule;

    /**
     * @param ApiResponse $response
     */
    public function __construct(private ApiResponse $response)
    {
        $this->credentialsManager = new CredentialsManager($response);
        $this->capsule = new Capsule;
    }

    public function setupConnection(): void
    {
        if (!isset($GLOBALS["is_testing"])) {
            $GLOBALS["is_testing"] = false;
        }

        if ($GLOBALS["is_testing"]) {
            // Eloquent ORM Capsule setup
            $this->capsule->addConnection([
                'driver' => 'sqlite',
                'url' => null,
                'database' => '/var/www/html/test-db/database.sqlite',
                'prefix' => '',
                'foreign_key_constraints' => false
            ]);

            // Make the Capsule instance available globally via static methods
            $this->capsule->setAsGlobal();

            // Setup the Eloquent ORM
            $this->capsule->bootEloquent();
        } else {
            $creds = $this->credentialsManager->getCredentials();
            if ($creds['success'] == true) {
                // Eloquent ORM Capsule setup
                $this->capsule->addConnection([
                    'driver' => 'mysql',
                    'host' => $creds['db_host'] . ":" . $creds["db_port"],
                    'database' => $creds['db_name'],
                    'username' => $creds['db_user'],
                    'password' => $creds['db_pass'],
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_czech_ci',
                    'prefix' => ''
                ]);

                // Make the Capsule instance available globally via static methods
                $this->capsule->setAsGlobal();

                // Setup the Eloquent ORM
                $this->capsule->bootEloquent();
            } else {
                $this->response->setError(Error::FailedDecrypt);
            }
        }
    }
}
