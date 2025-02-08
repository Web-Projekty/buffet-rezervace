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
     * @var array<string>
     */
    protected $fillable = ['username', 'password', 'isAdmin', 'fullName', 'email', 'class', "tel"];

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
     * @return array<mixed>
     */
    public static function getUserByName(string $username): array
    {
        try {
            if (UserModel::query()->where('username', $username)->exists()) {
                return UserModel::query()->where('username', $username)->first()->toArray();
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
            return UserModel::query()->where($haystack, $needle)->exists();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param string $username
     * @param string $password
     */

    public static function createUser(string $username, string $password, string $fullName, string | null $tel, string $email): bool
    {
        try {
            UserModel::query()->create([
                'username' => $username,
                'password' => $password,
                'isAdmin' => false,
                'fullName' => $fullName,
                'email' => $email,
                'tel' => $tel
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
            return (bool) UserModel::query()->where('id', $uid)->first()->isAdmin;
        } catch (QueryException) {}
        return false;
    }

    /**
     * @param $uid
     */
    public static function getPasswordById(int $uid): string | bool
    {
        try {
            return (string) UserModel::query()->where('id', $uid)->first()["password"];
        } catch (QueryException) {
            return false;
        }
    }

    /**
     * @return array<string>
     */
    public static function getColums(): array
    {
        $model = new UserModel();
        return $model->fillable;
    }

}
