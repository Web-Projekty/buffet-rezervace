<?php

namespace Buffet\Database;

use Buffet\Database\CredentialsManager;
use mysqli;

class Database
{
    private string $db_host;
    private string $db_user;
    private string $db_pass;
    private string $db_name;
    private mysqli $conn;

    function __construct()
    {
        $creds = new CredentialsManager;
        $credentials = $creds->getCredentials();
        if ($credentials['success'] == true) {

            $db_host = $credentials['db_host'];
            $db_user = $credentials['db_user'];
            $db_pass = $credentials['db_pass'];
            $db_name = $credentials['db_name'];

            $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
        }
        else{
            header('Content-Type: application/json');
            echo json_encode(['success'=>false,'error'=>"credentials decrypt error"]);
            die;
        }

        
    }
}
