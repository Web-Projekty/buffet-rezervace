<?php

use Buffet\Database\CredentialsManager;
use Buffet\Types\ApiResponse;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class CredentialsManagerTest extends TestCase
{

    /**
     * @var CredentialsManager
     */
    protected CredentialsManager $credentialsManager;
    protected ApiResponse $response;

    protected function setUp(): void
    {
        //error_reporting(E_ALL);

        $this->response = new ApiResponse();
        $this->credentialsManager = new CredentialsManager($this->response);
        // Set up a mock .env environment for testing

    }

    #[TestDox('Test createCredentials')]
    public function testCreateCredentials()
    {
        $this->credentialsManager->createCredentials(username: "test", password: "test");
        
        $this->output();
        $this->assertTrue(true);
    }

}
