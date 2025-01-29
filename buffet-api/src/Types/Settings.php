<?php
declare (strict_types = 1);

namespace Buffet\Types;

enum Settings: string {
    case DecryptKey = 'DECRYPT_KEY';

    case DBHost = "DB_HOST";
    case DBPort = "DB_PORT";
    case DBUser = "DB_USER";
    case DBPass = "DB_PASS";
    case DBName = "DB_NAME";

    case IsProd = 'IS_PRODUCTION';
    case ImageCacheTime = 'IMAGE_CACHE_TIME';
    case OrderDateLimitMax = 'ORDER_DATE_LIMIT_MAX';

    ##### ThePay #####
    case ThePayApiPass = 'THEPAY_API_PASS';
    case ThePayProjectId = 'THEPAY_PROJECT_ID';
    case PaymentCurrency = 'THEPAY_CURRENCY';
    case ThePayEnabled = 'THEPAY_ENABLED';
    case ThePayApi = 'THEPAY_API';
    case ThePayMerchantId = 'THEPAY_MERCHANT_ID';

    case Timezone = 'TIMEZONE';
}
