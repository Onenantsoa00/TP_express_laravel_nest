Cette API utilise laravel version 12 comme framework, une base de données PostgreSQL, et une authentification JWT pour sécuriser les utilisateurs.

Installation

Prérequis:
PHP et composer
PostgreSQL doit être installé et configuré.

Installation des dépendances avec composer install

Configuration de .env :
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel12
DB_USERNAME=your_username
DB_PASSWORD=your_password

migration de la base de données : php artisan migrate

configuration de JWT : composer require tymon/jwt-auth

lancement du server : php artisan serve

Le register et le login offre une token pour executer les autres requête, on ajoute dans headers Authorization: Bearer <token_venant_de_register_ou_login> avant de les executers

Documentation API
Ouvre postman puis configurer le endpoint
exemple Post http://127.0.0.1:8001/api/register
Headers : Content-Type: application/json
Body :
{
"name":"lianam",
"email":"lianam@gmail.com",
"password":"00000000"
}
Réponse :
{
"success": true,
"message": "User created successfully",
"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDEvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNzQxNjQxMDc5LCJleHAiOjE3NDE2NDQ2NzksIm5iZiI6MTc0MTY0MTA3OSwianRpIjoiblppd3UyS2o5MkZxaGRuTyIsInN1YiI6IjEwIiwicHJ2IjoiZDA5MDViY2Y2NWE2ZDk5MmQ5MGNiZmU0NjIyNmJkMzEzYWU1MTkzZiJ9.0faGEmFOYgIoCJpfF-m9VFl2-Xgyu-H--7sjJV-mCbM",
"status": 201
}
