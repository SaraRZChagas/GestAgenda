<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
        $msg = "Nome: ".$data['name']."<br/>".
        "Email: ".$data['email']."<br/>".
        "Mensagem: ".$data['message'];
        // Envia o e-mail
       //$add = env('MAIL_FROM_ADDRESS');
        Mail::raw($msg, function ($message) use ($data) {
            $message->to(config('mail.from.address')) 
        ->subject($data['subject'])
        ->from(config('mail.from.address'), config('mail.from.name'));
        });

        return back()->with('success', 'Mensagem enviada com sucesso!');
    }
}


