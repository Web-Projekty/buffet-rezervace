<?php

declare (strict_types = 1);

namespace Buffet\Tests;

use Buffet\Database\CredentialsManager;
use Buffet\Utils\EnvSetup;
use Buffet\Types\ApiResponse;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../../vendor/autoload.php';

class CredentialsManagerTest extends TestCase
{

    /**
     * @var CredentialsManager
     */
    protected CredentialsManager $credentialsManager;
    protected ApiResponse $response;
    protected EnvSetup $envSetup;

    protected function setUp(): void
    {
        $this->envSetup = new EnvSetup();
        $this->response = new ApiResponse();
        $this->credentialsManager = new CredentialsManager($this->response);

        $this->envSetup->setupDummyEnv();
        $this->envSetup->backupCreds();
    }

    #[TestDox('Test createCredentials')]
    public function testCreateCredentials()
    {
        $this->credentialsManager->createCredentials(username: "test", password: "test");

        $this->output();
        $this->assertTrue(true);
    }

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
        $this->envSetup->cleanupCreds();
    }
}
