<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class ContactController extends Controller
{
    public function sendEmail(Request $req){

        $req->validate([
            'name'=> 'required|string|max:255',
            'email'=> 'required|email',
            'message'=> 'required|string',
        ]);

        $data = [
            'name'=> $req->name,
            'email'=> $req->email,
            'message'=> $req->message,
        ];

        Mail::to('zz225864@gmail.com')->send(new ContactMail($data));
        return redirect(route('faq', [ 'goto' => 'contact' ]));
    }
}
