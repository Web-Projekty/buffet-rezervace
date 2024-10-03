<?php

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class UserModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'users';

    // Define the columns that are mass assignable
    /**
     * @var array
     */
    protected $fillable = ['username', 'password', 'isAdmin'];

    // Optionally, disable timestamps if the table doesn't have them
    /**
     * @var mixed
     */
    public $timestamps = false;

    public static function getAll()
    {
        try {
            return UserModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param  $username
     * @return mixed
     */
    public static function getUserByName($username)
    {
        if (UserModel::where('username', $username)->exists()) {
            return UserModel::where('username', $username)->toArray();
        }
        return [];
    }
}
