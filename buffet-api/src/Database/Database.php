<?php

declare(strict_types=1);

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

            $this->conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'error' => "credentials decrypt error"]);
            die;
        }
    }

    function __destruct()
    {
        $this->conn->close();
    }

    function isDuplicate($table_name, $collumn_name, $needle)
    {
        $result = $this->query("SELECT COUNT(`$collumn_name`) FROM `$table_name` WHERE `$collumn_name`= '$needle'");
        $duplicate_count = $result->fetch_row()[0];
        if ($duplicate_count > 0) {
            return true;
        }
        return false;
    }

    function query($sql)
    {
        return $this->conn->query($sql);
    }
}
