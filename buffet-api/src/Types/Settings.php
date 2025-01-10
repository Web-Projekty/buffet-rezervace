<?php
declare (strict_types = 1);

namespace Buffet\Types;

enum Settings: string {
    case DecryptKey = 'DECRYPT_KEY';
    case IsProd = 'IS_PRODUCTION';
    case ImageCacheTime = 'IMAGE_CACHE_TIME';
    case OrderDateLimitMax = 'ORDER_DATE_LIMIT_MAX';

    case PaymentCurrency = 'THEPAY_CURRENCY';
    case ThePayEnabled = 'THEPAY_ENABLED';
    # API klíč brány ThePay
    case ThePayApi = 'THEPAY_API';
    # API heslo k bráně ThePay
    case ThePayApiPass = 'THEPAY_API_PASS';
    case ThePayProjectId = 'THEPAY_PROJECT_ID';
    case Timezone = 'TIMEZONE';
}
