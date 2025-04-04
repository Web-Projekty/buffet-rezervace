<?php
declare (strict_types = 1);

use Buffet\Api\AuthApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvWriter;
use PHPUnit\Framework\TestCase;

final class AuthApiTest extends TestCase
{
    protected function setUp(): void
    {
        // Clean up the users table before each test if available.
        EnvWriter::write(Settings::IsProd, "false");
        EnvWriter::write(Settings::JWTKey, "super_secret_key");
        if (!isset($GLOBALS["is_db_setupped"])) {
            $dbMan = new DatabaseManager(new ApiResponse());
            $GLOBALS["is_testing"] = true;
            $dbMan->setupConnection();
            $GLOBALS["is_db_setupped"] = true;
        }
        UserModel::query()->delete();
    }

    // REGISTER TESTS

    public function testRegisterSuccess(): void
    {
        $data = [
            "username" => "uniqueUser",
            "password" => "password123",
            "confirmPassword" => "password123",
            "fullName" => "Unique User",
            "tel" => "123456789",
            "email" => "unique@example.com"
        ];
        $response = new ApiResponse($data);
        $authApi = new AuthApi();
        $result = $authApi->register($response);
        $this->assertFalse($result->hasFailed());
        $this->assertEquals(Success::Registration->getValue(), $result->getPayload('msg'));
    }

    public function testRegisterDuplicateUsername(): void
    {
        // First, create a user with the username.
        UserModel::createUser(
            username: "duplicateUser",
            password: password_hash("password123", PASSWORD_BCRYPT),
            fullName: "First User",
            tel: "111111111",
            email: "first@example.com"
        );
        $data = [
            "username" => "duplicateUser",
            "password" => "password456",
            "confirmPassword" => "password456",
            "fullName" => "Second User",
            "tel" => "222222222",
            "email" => "second@example.com"
        ];
        $response = new ApiResponse($data);
        $authApi = new AuthApi();
        $result = $authApi->register($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::UserInUse->getValue(), $result->getPayload('msg'));
    }

    public function testRegisterInvalidEmail(): void
    {
        $data = [
            "username" => "newUser",
            "password" => "password123",
            "confirmPassword" => "password123",
            "fullName" => "New User",
            "tel" => "123456789",
            "email" => "invalid-email"
        ];
        $response = new ApiResponse($data);
        $authApi = new AuthApi();
        $result = $authApi->register($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::InvalidEmail->getValue(), $result->getPayload('msg'));
    }

    public function testRegisterPasswordMismatch(): void
    {
        $data = [
            "username" => "userMismatch",
            "password" => "password123",
            "confirmPassword" => "differentPassword",
            "fullName" => "Mismatch User",
            "tel" => "123456789",
            "email" => "mismatch@example.com"
        ];
        $response = new ApiResponse($data);
        $authApi = new AuthApi();
        $result = $authApi->register($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::PasswordMismatch->getValue(), $result->getPayload('msg'));
    }

    public function testRegisterDuplicateEmail(): void
    {
        // First, create a user with the email.
        UserModel::createUser(
            username: "firstUser",
            password: password_hash("password123", PASSWORD_BCRYPT),
            fullName: "First User",
            tel: "111111111",
            email: "duplicate@example.com"
        );
        $data = [
            "username" => "secondUser",
            "password" => "password456",
            "confirmPassword" => "password456",
            "fullName" => "Second User",
            "tel" => "222222222",
            "email" => "duplicate@example.com"
        ];
        $response = new ApiResponse($data);
        $authApi = new AuthApi();
        $result = $authApi->register($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::EmailInUse->getValue(), $result->getPayload('msg'));
    }

    // LOGIN TESTS

    public function testLoginNonexistentUser(): void
    {
        $data = [
            "username" => "nonexistentUser",
            "password" => "anyPassword"
        ];
        $response = new ApiResponse($data);
        // Set a payload key so that login method assigns variables.
        $response->setPayloadKeys(["token", "uid", "fullName", "email", "class", "tel", "isAdmin"]);
        $authApi = new AuthApi();
        $result = $authApi->login($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::NonexistentUser->getValue(), $result->getPayload('msg'));
    }

    public function testLoginWrongPassword(): void
    {
        // Create a user.
        $password = "correctPassword";
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        UserModel::createUser(
            username: "loginUser",
            password: $hashed,
            fullName: "Login User",
            tel: "123456789",
            email: "login@example.com"
        );
        $data = [
            "username" => "loginUser",
            "password" => "wrongPassword"
        ];
        $response = new ApiResponse($data);
        $response->setPayloadKeys(["token", "uid", "fullName", "email", "class", "tel", "isAdmin"]);
        $authApi = new AuthApi();
        $result = $authApi->login($response);
        $this->assertTrue($result->hasFailed());
        $this->assertEquals(Error::WrongPassword->getValue(), $result->getPayload('msg'));
    }

    public function testLoginSuccess(): void
    {
        // Create a user.
        $password = "correctPassword";
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $user = UserModel::createUser(
            username: "loginSuccess",
            password: $hashed,
            fullName: "Successful User",
            tel: "987654321",
            email: "success@example.com"
        );
        $data = [
            "username" => "loginSuccess",
            "password" => "correctPassword"
        ];
        $response = new ApiResponse($data);
        $response->setPayloadKeys(["token", "uid", "fullName", "email", "class", "tel", "isAdmin"]);
        $authApi = new AuthApi();
        $result = $authApi->login($response);
        $this->assertFalse($result->hasFailed());
        $this->assertEquals(Success::Login->getValue(), $result->getPayload('msg'));
        // Check that a token was set in the payload.
        $this->assertArrayHasKey("token", $result->getPayload());
        $this->assertNotEmpty($result->getPayload()['token']);
    }
}
