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
        return response()->json(['message' =>'Usuario creado con exito'],201);
                    // test succesful
                    // $body = ["email"=>$request->email,"password"=>$request->password,"username"=>$request->username];
                    // $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3334/']);
                    // $response = $client->post('http://127.0.0.1:3334/registrar',
                    // [
                    //     'form_params' => $body
                    // ]);
                    // return $response->getBody();
    }
    public function Start (Request $request)
    {
                $credentials = request(['email', 'password']);
                // Auth::once
        if (!Auth::once($credentials))
        {
            return response()->json([
                'message' => 'Usuario y/o contraseñas invalidas'], 401);
                // abort(401);
        }
        $token = Str::random(60);
        $request->user()->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();
        return response()->json(['message' =>'Token creado con exito'],201);

    }

}
