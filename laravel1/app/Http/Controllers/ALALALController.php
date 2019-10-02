<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    }
}
