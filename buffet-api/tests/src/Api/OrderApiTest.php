<?php
declare (strict_types = 1);

use Buffet\Api\OrderApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\TempModel;
use Buffet\Database\Models\TimeslotModel;
use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Exceptions\OutOfOrderIdsException;
use Buffet\Types\OrderStatus;
use Buffet\Types\PaymentMethods;
use Buffet\Types\Settings;
use Buffet\Utils\EnvWriter;
use DateException;
use Exception;
use PHPUnit\Framework\TestCase;

final class OrderApiTest extends TestCase
{
    protected function setUp(): void
    {
        OrderModel::query()->delete();
        TempModel::query()->delete();
        TimeslotModel::query()->delete();
        if (!isset($GLOBALS["is_db_setupped"])) {
            $dbMan = new DatabaseManager(new ApiResponse());
            $GLOBALS["is_testing"] = true;
            $dbMan->setupConnection();
            $GLOBALS["is_db_setupped"] = true;
        }
        $GLOBALS["is_testing"] = true;
        // Clean up users if needed.
    }

    public function testGenerateTimeslotsSuccess(): void
    {
        $orderApi = new OrderApi();
        // Using "08:00" to "09:00", interval 15 minutes, order limit 15.
        $orderApi->generateTimeslots("08:00", "09:00", 15, 15, true);

        $timeslots = TimeslotModel::all();
        // With these parameters, expect 4 timeslots:
        // Iteration: 08:00->08:15, 08:15->08:30, 08:30->08:45, 08:45->09:00.
        $this->assertCount(4, $timeslots);
        $first = $timeslots->first();
        // Note: the implementation formats times with the "m" format (minutes).
        $this->assertEquals("08:00", $first->startTime);
        $this->assertEquals("08:15", $first->endTime);
    }

    public function testGenerateTimeslotsWithInvalidDate(): void
    {
        $orderApi = new OrderApi();
        $this->expectException(DateException::class);
        $orderApi->generateTimeslots("invalid", ",sůlkfoěwráz", 15, 15, true);
    }

    public function testGenerateTimeslotsWithStartAfterEnd(): void
    {
        $this->expectException(\Buffet\Types\Exceptions\NegativeValueException::class);
        $orderApi = new OrderApi();
        $orderApi->generateTimeslots("10:00", "09:00", 15, 15, true);
    }

    public function testGenerateTempThrowsNegativeValueException(): void
    {
        // Set environment variable so OrderDateLimitMax <= 1.
        //putenv(Settings::OrderDateLimitMax->value . "=1");
        EnvWriter::write(Settings::OrderDateLimitMax, "1");
        $orderApi = new OrderApi();
        $this->expectException(NegativeValueException::class);
        $orderApi->generateTemp();
    }

    public function testGenerateTempSuccess(): void
    {
        // Set OrderDateLimitMax to 3 days.
        EnvWriter::write(Settings::OrderDateLimitMax, "3");
        //putenv(Settings::OrderDateLimitMax->value . "=3");
        // Prepopulate TimeslotModel with two timeslot records.
        TimeslotModel::query()->insert([
            ['startTime' => '08:00:00', 'endTime' => '08:30:00', 'orderLimit' => 10],
            ['startTime' => '08:30:00', 'endTime' => '09:00:00', 'orderLimit' => 10]
        ]);
        // Ensure no orders exist.
        $orderApi = new OrderApi();
        $orderApi->generateTemp();
        $temps = TempModel::all();
        // 3 days × 2 timeslots per day = 6 records expected.
        $this->assertCount(6, $temps);
        $first = $temps->first()->toArray();
        $this->assertArrayHasKey('date', $first);
        $this->assertArrayHasKey('startTime', $first);
        $this->assertArrayHasKey('endTime', $first);
        $this->assertArrayHasKey('orderLimit', $first);
        $this->assertArrayHasKey('orderCount', $first);
    }

    public function testIsFreeReturnsTrueWhenUnderLimit(): void
    {
        $orderApi = new OrderApi();
        $date = date('Y-m-d');
        // No orders exist for this date/time.
        $this->assertTrue($orderApi->isFree("09:00", "10:00", $date, 5));
    }

    // public function testIsFreeReturnsFalseWhenLimitReached(): void
    // {
    //     $orderApi = new OrderApi();
    //     $date = date('Y-m-d');
    //     $items = [
    //         ['id' => 1, 'quantity' => 1, 'variants' => []]
    //     ];
    //     // Create an order overlapping with 09:00-10:00 using the createOrder method.
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     OrderModel::createOrder(1, OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:30:00', '10:30:00');
    //     // With limit 1, one order exists that overlaps, so isFree should return false.
    //     $this->assertFalse(!$orderApi->isFree("09:30", "10:30", $date, 1));
    // }

    public function testGetOrderPickupIdReturnsThreeDigitString(): void
    {
        $orderApi = new OrderApi();
        // Ensure orders with statuses of interest are absent.
        OrderModel::query()->delete();
        $pickupId = OrderApi::getOrderPickupId();
        $this->assertMatchesRegularExpression('/^\d{3}$/', $pickupId);
    }

    // public function testGetOrderPickupIdThrowsOutOfOrderIdsExceptionWhenCountExceeds(): void
    // {
    //     $this->expectException(OutOfOrderIdsException::class);
    //     $date = date('Y-m-d');
    //     $items = [
    //         ['id' => 1, 'quantity' => 1, 'variants' => []]
    //     ];
    //     for ($i = 0; $i < 1; $i++) {
    //         OrderModel::createOrder(1, OrderStatus::Sent, $date, $items, PaymentMethods::ThePay->value, '09:00:00', '10:00:00');
    //     }
    //     OrderApi::getOrderPickupId();
    //     throw new OutOfOrderIdsException("no thank you");
    // }

    // public function testUpdateOrderSuccess(): void
    // {
    //     $user = UserModel::createUser(
    //         username: "orderUser",
    //         password: password_hash("password", PASSWORD_BCRYPT),
    //         fullName: "Order User",
    //         tel: "123456789",
    //         email: "orderuser@example.com"
    //     );
    //     $date = date('Y-m-d');
    //     $this->expectException(Exception::class);
    //     $items = [
    //         ['id' => 1, 'quantity' => 1, 'variants' => []]
    //     ];
    //     $user = UserModel::getUserByName("orderUser");
    //     $orderArray = OrderModel::createOrder($user["id"], OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:00:00', '10:00:00');
    //     $orderApi = new OrderApi();
    //     $orderApi->updateOrder((int) $orderArray['userId'], ['status' => OrderStatus::Sent->value]);
    //     $updatedOrder = OrderModel::query()->find((int) $orderArray['userId']);
    //     $this->assertEquals(OrderStatus::Sent->value, $updatedOrder->getAttribute("status"));
    // }

    // public function testUpdateOrderInvalidStatusThrowsException(): void
    // {
    //     $user = UserModel::createUser(
    //         username: "orderUser2",
    //         password: password_hash("password", PASSWORD_BCRYPT),
    //         fullName: "Order User 2",
    //         tel: "987654321",
    //         email: "orderuser2@example.com"
    //     );
    //     $date = date('Y-m-d');
    //     $items = [
    //         ['id' => 1, 'quantity' => 1, 'variants' => []]
    //     ];
    //     $user = UserModel::getUserByName("orderUser2");
    //     $orderArray = OrderModel::createOrder($user["id"], OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:00:00', '10:00:00');
    //     $orderApi = new OrderApi();
    //     $this->expectException(Exception::class);
    //     $this->expectExceptionMessage("Order not found");
    //     $orderApi->updateOrder((int) $orderArray['userId'], ['status' => 'invalid_status']);
    // }

    public function testUpdateOrderNonexistentOrderThrowsException(): void
    {
        $orderApi = new OrderApi();
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Order not found");
        $orderApi->updateOrder(999999, ['status' => OrderStatus::Sent->value]);
    }

    // public function testUpdateOrderInvalidUserIdThrowsException(): void
    // {
    //     $user = UserModel::createUser(
    //         username: "orderUserInvalid",
    //         password: password_hash("password", PASSWORD_BCRYPT),
    //         fullName: "Order User Invalid",
    //         tel: "111111111",
    //         email: "orderinvalid@example.com"
    //     );
    //     $date = date('Y-m-d');
    //     $items = [
    //         ['id' => 1, 'quantity' => 1, 'variants' => []]
    //     ];
    //     $user = UserModel::getUserByName("orderUserInvalid");
    //     $orderArray = OrderModel::createOrder($user["id"], OrderStatus::Waiting, $date, $items, PaymentMethods::ThePay->value, '09:00:00', '10:00:00');
    //     $orderApi = new OrderApi();
    //     $this->expectException(Exception::class);
    //     $this->expectExceptionMessage("Order not found");
    //     $orderApi->updateOrder((int) $orderArray['userId'], ['userId' => 999999]);
    // }

}
