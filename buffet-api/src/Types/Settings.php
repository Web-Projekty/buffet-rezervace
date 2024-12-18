<?php
declare (strict_types = 1);

namespace Buffet\Types;

enum Settings: string {
    case DecryptKey = 'DECRYPT_KEY';
    case IsProd = 'IS_PRODUCTION';
}
