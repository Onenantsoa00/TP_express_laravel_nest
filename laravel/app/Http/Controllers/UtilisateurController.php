<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UtilisateurController extends Controller
{

    public function show_utilisateurs()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(Utilisateur::all(), 200);
    }

    public function create_utilisateurs(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $utilisateur = Utilisateur::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($utilisateur, 201);
    }

    public function show_utilisateurs_by_id(string $id)
    {
        if (empty($id)) {
            return response()->json(['error' => 'Missing ID'], 400);
        }

        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['error' => 'Utilisateur not found'], 404);
        }

        return response()->json($utilisateur, 200);
    }

    public function update_utilisateurs(Request $request, string $id)
    {
        if (empty($id)) {
            return response()->json(['error' => 'Missing ID'], 400);
        }

        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['error' => 'Utilisateur not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:utilisateurs,email,' . $id,
            'password' => 'sometimes|required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $utilisateur->update($request->all());

        return response()->json($utilisateur, 200);
    }

    public function delete_utilisateurs(string $id)
    {
        if (empty($id)) {
            return response()->json(['error' => 'Missing ID'], 400);
        }

        $utilisateur = Utilisateur::find($id);

        if (!$utilisateur) {
            return response()->json(['error' => 'Utilisateur not found'], 404);
        }

        $utilisateur->delete();

        return response()->json(null, 204);
    }
}
