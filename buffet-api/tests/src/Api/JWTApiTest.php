<?php

use Buffet\Api\JWTApi;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPUnit\Framework\TestCase;
use stdClass;

class JWTApiTest extends TestCase
{
        private JWTApi $jwtApi;

            protected function setUp(): void
                {
                            $this->jwtApi = new JWTApi();
                }

                    public function testGetToken(): void
                        {
                                    $token = $this->jwtApi->getToken(1, 'testuser');
                                            $this->assertIsString($token);
                                                    
                                                            $decoded = JWT::decode($token, new Key('example_key', 'HS384'));
                                                                    $this->assertEquals(1, $decoded->sub);
                                                                            $this->assertEquals('testuser', $decoded->name);
                        }

                            public function testDecodeTokenWithValidToken(): void
                                {
                                            $token = $this->jwtApi->getToken(1, 'testuser');
                                                    $responseMock = $this->createMock(ApiResponse::class);
                                                            $responseMock->method('getRequestByKey')->willReturn($token);

                                                                    $decoded = $this->jwtApi->decodeToken($responseMock);
                                                                            $this->assertInstanceOf(stdClass::class, $decoded);
                                                                                    $this->assertEquals(1, $decoded->sub);
                                                                                            $this->assertEquals('testuser', $decoded->name);
                                }

                                    public function testDecodeTokenWithInvalidToken(): void
                                        {
                                                    $responseMock = $this->createMock(ApiResponse::class);
                                                            $responseMock->method('getRequestByKey')->willReturn('invalid_token');
                                                                    $responseMock->expects($this->once())->method('setError')->with(Error::TamperedSign);
                                                                            
                                                                                    $this->jwtApi->decodeToken($responseMock);
                                        }

                                            public function testDecodeTokenWithMissingToken(): void
                                                {
                                                            $responseMock = $this->createMock(ApiResponse::class);
                                                                    $responseMock->method('getRequestByKey')->willReturn('');
                                                                            $responseMock->expects($this->once())->method('setError')->with(Error::MissingToken);

                                                                                    $this->jwtApi->decodeToken($responseMock);
                                                }

                                                    public function testValidateTokenWithValidToken(): void
                                                        {
                                                                    $_SERVER['HTTP_HOST'] = 'localhost';
                                                                            
                                                                                    $token = $this->jwtApi->getToken(1, 'testuser');
                                                                                            $responseMock = $this->createMock(ApiResponse::class);
                                                                                                    $responseMock->method('getRequestByKey')->willReturn($token);

                                                                                                            $result = $this->jwtApi->validateToken($responseMock);
                                                                                                                    $this->assertFalse($result);
                                                        }

                                                            public function testValidateTokenWithExpiredToken(): void
                                                                {
                                                                            $_SERVER['HTTP_HOST'] = 'localhost';
                                                                                    
                                                                                            $expiredPayload = [
                                                                                                            'iss' => 'localhost',
                                                                                                                        'iat' => time() - 3600,
                                                                                                                                    'exp' => time() - 1800,
                                                                                                                                                'sub' => 1,
                                                                                                                                                            'name' => 'testuser'
                                                                                            ];
                                                                                                    $token = JWT::encode($expiredPayload, 'example_key', 'HS384');
                                                                                                            
                                                                                                                    $responseMock = $this->createMock(ApiResponse::class);
                                                                                                                            $responseMock->method('getRequestByKey')->willReturn($token);
                                                                                                                                    $responseMock->expects($this->once())->method('setError')->with(Error::TokenExpired);
                                                                                                                                            
                                                                                                                                                    $this->jwtApi->validateToken($responseMock);
                                                                }
}
                                                                                            ]
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
}
