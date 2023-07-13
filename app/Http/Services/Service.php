<?php

namespace App\Http\Services;

class Service
{
    public $username;

    public function __construct()
    {
        // Check if user is logged in
        $auth = auth('sanctum')->user();

        $this->username = $auth ? $auth->username : '@guest';
    }
}
