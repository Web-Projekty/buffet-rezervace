<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum ApiStatus: string {
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}