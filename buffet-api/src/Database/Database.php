<?php

declare (strict_types = 1);

namespace Buffet\Database;

use Buffet\Database\Models\UserModel;

class Database
{

    /**
     * @param string $haystack
     * @param string $needle
     */
    function isDuplicate(string $haystack, string $needle)
    {
        return UserModel::where($haystack, $needle)->exists();
    }

    /**
     * @param  $sql
     * @return mixed
     */
}
