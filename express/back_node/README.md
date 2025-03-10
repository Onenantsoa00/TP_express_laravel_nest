Cette API utilise Express.js comme framework backend, une base de données PostgreSQL, et une authentification JWT pour sécuriser les utilisateurs.

Installation

Prérequis:
Node.js doit être installé.
PostgreSQL doit être installé et configuré.

Installation des dépendances:
Exécutez la commande suivante pour installer toutes les dépendances nécessaires :
npm install bcrypt cors dotenv express jsonwebtoken morgan pg swagger-jsdoc swagger-ui-express

Configuration des variables d’environnement
Créez un fichier .env et ajoutez les paramètres suivants :
PORT=8000
JWT_SECRET_KEY=azertyuiopqsdfghjklm
JWT_EXPIRATION=1h

Configuration de la base de données
La configuration de PostgreSQL se trouve dans le fichier : src/config/db_postgres.js

Configuration du JWT
Le JWT est géré dans les fichiers suivants :  
 src/authWebtokens.js
src/utils.js

Lancement du serveur
Démarrez le serveur avec la commande : npm run dev

Le register et le login offre une token pour executer les autres requête, on ajoute dans headers Authorization: Bearer <token_venant_de_register_ou_login> avant de les executers

Documentation API
Vous pouvez consulter la documentation Swagger de l’API en accédant à : http://localhost:8080/api-docs/

Exemple de requête pour tester l’API
Requête POST /api/utilisateur/register
URL : http://127.0.0.1:8080/api/utilisateur/register
Headers : Content-Type: application/json
Body (JSON) :
{
"name": "Ranaivoo",
"email": "onenantsoaranaivo@gmail.com",
"password": "00000000"
}
Réponse attendue
{
"success": true,
"message": "Admin created successfully",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"status": 201
}
