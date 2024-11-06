<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class UserModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Users';

    // Define the columns that are mass assignable
    /**
     * @var array
     */
    protected $fillable = ['username', 'password', 'isAdmin', 'fullName', 'email', 'class'];

    // Optionally, disable timestamps if the table doesn't have them

    /**
     * @var bool
     */
    public $timestamps = false;

    public static function getAll(): \Illuminate\Database\Eloquent\Collection  | bool
    {
        try {
            return UserModel::all();
        } catch (QueryException) {
            return false;
        }
    }

    /**
     * @param  $username
     * @return mixed
     */
    public static function getUserByName($username): array
    {
        try {
            if (UserModel::where('username', $username)->exists()) {
                return UserModel::where('username', $username)->first()->toArray();
            }
        } catch (QueryException $e) {}
        return [];
    }

    /**
     * @param string $haystack
     * @param string $needle
     */
    public static function isDuplicate(string $haystack, string $needle): bool
    {
        try {
            return UserModel::where($haystack, $needle)->exists();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param string $username
     * @param string $password
     */

    public static function createUser(string $username, string $password): bool
    {
        try {
            UserModel::create([
                'username' => $username,
                'password' => $password,
                'isAdmin' => false,
                'fullName' => 'idk',
                'email' => 'default@spseplzen.cz',
                'class' => '5.H'
            ]);
        } catch (\Illuminate\Database\QueryException) {
            return false;
        }
        return true;
    }

    /**
     * @param int $uid
     */
    public static function isAdmin(int $uid): bool
    {
        try {
            return (bool) UserModel::where('id', $uid)->first()->isAdmin;
        } catch (QueryException) {}
        return false;
    }
}
