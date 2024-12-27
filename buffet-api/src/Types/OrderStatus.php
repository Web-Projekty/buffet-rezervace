<?php

declare(strict_types=1);

namespace Buffet\Types;

enum OrderStatus: string
{
    case Sent = 'sent';
    case Waiting = 'waiting';
    case Done = 'done';
    case Storno = 'storno';
    case Cancelled = 'cancelled';
}

