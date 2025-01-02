<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum EventTypes: string
{
    case CreateOrder = "createOrder";
    case UpdateOrder = "updateOrder";
}
