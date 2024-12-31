<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum PaymentMethods: string {
    case Credits = 'credits';
    case Cash = 'cash';
    case ThePay = 'thePay';
}
