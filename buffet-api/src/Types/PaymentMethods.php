<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum PaymentMethods: string {
    case Cash = 'cash';
    case ThePay = 'thePay';
}
