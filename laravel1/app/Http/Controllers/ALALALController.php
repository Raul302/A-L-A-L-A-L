<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\User;

class ALALALController extends Controller
{
    public function Registrar(Request $request)
    {
        $usuario= new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $usuario->save();
                    $body = ["email"=>$request->email,"password"=>$request->password,"username"=>$request->username];
                    $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3334/']);
                    $response = $client->post('http://127.0.0.1:3334/Send',
                    [
                        'form_params' => $body
                    ]);
                    return $response->getBody();
    }
}
