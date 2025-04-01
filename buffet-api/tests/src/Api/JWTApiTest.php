<?php
declare (strict_types = 1);

use Buffet\Api\JWTApi;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Buffet\Utils\EnvWriter;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPUnit\Framework\TestCase;

final class JWTApiTest extends TestCase
{
    private JWTApi $jwtApi;

    protected function setUp(): void
    {
        EnvWriter::write(Settings::IsProd, "false");
        EnvWriter::write(Settings::JWTKey, "testing_key");
        $this->jwtApi = new JWTApi();
    }

    public function testDecodeTokenWithValidToken(): void
    {
        $payload = [
            'iss' => 'localhost',
            'iat' => time(),
            'exp' => time() + 3600,
            'sub' => 1,
            'name' => 'testuser',
            'admin' => false
        ];
        $token = JWT::encode($payload, EnvReader::getEnvProperty(Settings::JWTKey), 'HS384');
        $_SERVER['HTTP_HOST'] = 'localhost';
        $response = new ApiResponse(['token' => $token]);
        $result = $this->jwtApi->decodeToken($response);
        $this->assertInstanceOf(stdClass::class, $result);
        $this->assertEquals(1, $result->sub);
        $this->assertEquals('testuser', $result->name);
    }

    public function testDecodeTokenWithMissingToken(): void
    {
        $response = new ApiResponse(['token' => '']);
        $result = $this->jwtApi->decodeToken($response);
        $this->assertTrue($response->hasFailed());
        $this->assertEquals(Error::MissingToken->getValue(), $response->getPayload('msg'));
    }

    public function testDecodeTokenWithInvalidToken(): void
    {
        $response = new ApiResponse(['token' => 'invalid_token']);
        $result = $this->jwtApi->decodeToken($response);
        $this->assertTrue($response->hasFailed());
        $this->assertEquals(Error::UnexpectedValue->getValue(), $response->getPayload('msg'));
    }

    public function testValidateTokenWithValidToken(): void
    {
        $payload = [
            'iss' => 'localhost',
            'iat' => time() - 10,
            'exp' => time() + 3600,
            'sub' => 2,
            'name' => 'user2',
            'admin' => false
        ];
        $token = JWT::encode($payload, EnvReader::getEnvProperty(Settings::JWTKey), 'HS384');
        $_SERVER['HTTP_HOST'] = 'localhost';
        $response = new ApiResponse(['token' => $token]);
        $result = $this->jwtApi->validateToken($response);
        $this->assertFalse($result);
        $this->assertFalse($response->hasFailed());
    }

    public function testValidateTokenWithExpiredToken(): void
    {
        $payload = [
            'iss' => 'localhost',
            'iat' => time() - 3600,
            'exp' => time() - 1800,
            'sub' => 3,
            'name' => 'user3',
            'admin' => false
        ];
        $token = JWT::encode($payload, EnvReader::getEnvProperty(Settings::JWTKey), 'HS384');
        $_SERVER['HTTP_HOST'] = 'localhost';
        $response = new ApiResponse(['token' => $token]);
        $this->jwtApi->validateToken($response);
        $this->assertTrue($response->hasFailed());
        $this->assertEquals(Error::TokenExpired->getValue(), $response->getPayload('msg'));
    }

    public function testValidateTokenWithBadDomain(): void
    {
        $payload = [
            'iss' => 'notlocalhost',
            'iat' => time() - 10,
            'exp' => time() + 3600,
            'sub' => 4,
            'name' => 'user4',
            'admin' => false
        ];
        $token = JWT::encode($payload, EnvReader::getEnvProperty(Settings::JWTKey), 'HS384');
        $_SERVER['HTTP_HOST'] = 'production.com';
        $response = new ApiResponse(['token' => $token]);
        $this->jwtApi->validateToken($response);
        $this->assertTrue($response->hasFailed());
        $this->assertEquals(Error::BadDomain->getValue(), $response->getPayload('msg'));
    }

    public function testValidateTokenWithFutureIssuedAt(): void
    {
        $payload = [
            'iss' => 'localhost',
            'iat' => time() + 3600,
            'exp' => time() + 7200,
            'sub' => 5,
            'name' => 'user5',
            'admin' => false
        ];
        $token = JWT::encode($payload, EnvReader::getEnvProperty(Settings::JWTKey), 'HS384');
        $_SERVER['HTTP_HOST'] = 'localhost';
        $response = new ApiResponse(['token' => $token]);
        $this->jwtApi->validateToken($response);
        $this->assertTrue($response->hasFailed());
        $this->assertEquals(Error::UnexpectedValue->getValue(), $response->getPayload('msg'));
    }

    public function testGetToken(): void
    {
        $_SERVER['HTTP_HOST'] = 'localhost';
        $uid = 10;
        $username = 'testuser10';
        $token = $this->jwtApi->getToken($uid, $username);
        $decoded = JWT::decode($token, new Key(EnvReader::getEnvProperty(Settings::JWTKey), 'HS384'));
        $this->assertEquals('localhost', $decoded->iss);
        $this->assertEquals($uid, $decoded->sub);
        $this->assertEquals($username, $decoded->name);
    }

    public function testGetAdminToken(): void
    {
        $_SERVER['HTTP_HOST'] = 'localhost';
        $token = JWTApi::getAdminToken();
        $decoded = JWT::decode($token, new Key(EnvReader::getEnvProperty(Settings::JWTKey), 'HS384'));
        $this->assertEquals('localhost', $decoded->iss);
        $this->assertTrue($decoded->admin);
    }
}
