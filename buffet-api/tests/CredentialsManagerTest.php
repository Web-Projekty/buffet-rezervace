<?php

use Buffet\Database\CredentialsManager;

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class CredentialsManagerTest extends TestCase
{
    
    protected $credentialsManager;
    
    protected function setUp(): void
    {
        $this->credentialsManager = new CredentialsManager();
        
        // Set up a mock .env environment for testing
        $_ENV['DECRYPT_KEY'] = 'test_decrypt_key';
    }

    #[TestDox('Test getCredentials() with success')]
    public function testGetCredentialsSuccess()
    {
        // Mock the content of creds.json file
        $creds = json_encode([
            'db_host' => 'localhost',
            'db_user' => base64_encode(openssl_encrypt('test_user', 'aes-256-ecb', $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA)),
            'db_pass' => base64_encode(openssl_encrypt('test_pass', 'aes-256-ecb', $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA)),
            'db_name' => 'test_database'
        ]);

        // Mock file_get_contents to return the mocked creds
        file_put_contents(__DIR__ . '/creds.json', $creds);

        $credentials = $this->credentialsManager->getCredentials();

        $this->assertTrue($credentials['success']);
        $this->assertEquals('localhost', $credentials['db_host']);
        $this->assertEquals('test_user', $credentials['db_user']);
        $this->assertEquals('test_pass', $credentials['db_pass']);
        $this->assertEquals('test_database', $credentials['db_name']);
    }

    #[TestDox('It returns an error when DECRYPT_KEY is missing')]
    public function testGetCredentialsFailure()
    {
        // Simulate a failure by not setting DECRYPT_KEY
        unset($_ENV['DECRYPT_KEY']);
        
        $credentials = $this->credentialsManager->getCredentials();

        $this->assertFalse($credentials['success']);
        $this->assertEquals('failed to decrypt credentials', $credentials['error']);
    }

    #[TestDox('It successfully creates encrypted credentials and saves them to a file')]
    public function testCreateCredentials()
    {
        // Test creating new credentials
        $username = 'new_user';
        $password = 'new_pass';

        $this->credentialsManager->createCredentials($username, $password);

        // Read the generated creds.json
        $creds = json_decode(file_get_contents(__DIR__ . '/creds.json'), true);

        $this->assertEquals('localhost', $creds['db_host']);

        // Decrypt and verify the username and password
        $decryptedUsername = openssl_decrypt(base64_decode($creds['db_user']), 'aes-256-ecb', $_ENV['DECRYPT_KEY']);
        $decryptedPassword = openssl_decrypt(base64_decode($creds['db_pass']), 'aes-256-ecb', $_ENV['DECRYPT_KEY']);
        
        $this->assertEquals($username, $decryptedUsername);
        $this->assertEquals($password, $decryptedPassword);
    }

    protected function tearDown(): void
    {
        // Clean up by deleting the test creds.json file
        if (file_exists(__DIR__ . '/creds.json')) {
            echo "dsa";
            unlink(__DIR__ . '/creds.json');
        }
    }
}
