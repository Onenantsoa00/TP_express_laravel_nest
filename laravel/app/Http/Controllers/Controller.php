<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[
    OA\Info(version : "1.0.0", title : "Utilisateur API", description : "API pour la gestion des utilisateurs"),
    OA\Server(url : "http://localhost:8001", description : "Serveur local"),
    OA\Server(url : "http://staging.example.com", description : "Staging server"),
    OA\Server(url : "http://example.com", description : "Production server"),
    OA\SecurityScheme(
        securityScheme: "bearerAuth",
        type : "http",
        name: "Authorization",
        in:"header",
        scheme : "bearer",)

]

abstract class Controller
{
    //
}
