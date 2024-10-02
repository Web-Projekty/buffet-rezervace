<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum Status: string {
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}