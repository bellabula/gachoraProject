<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeDirectToController extends Controller
{
    public function __invoke($str)
    {
        return view($str);
    }
    public function redirect($urlId)
    {
        switch ($urlId) {
            case 1:
                $url = 'http://localhost/gachoraProject/public/api/1';
                break;
            case 2:
                $url = 'http://localhost/gachoraProject/public/api/2';
                break;
            default:
                $url = 'http://localhost/gachoraProject/public/api/3';
        }
        return redirect()->away($url);
    }
}
