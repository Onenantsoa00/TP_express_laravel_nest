On installe le projet nestjs par :

- npm i -g @nestjs/cli
- nest new nest

Installation du typeOrm et postgress : npm install --save @nestjs/typeorm typeorm pg

configuration du base de données dans app.module.ts : host, port, user, password, nom du base de données

Créer une resource utilisateurs pour avoir une DTO, entités, controller et service: utilisateurs nest g res

installation du class-validator et class-transformer pour valider le corps de la requête : npm i --save classe -validator classe -transformer

configuration de DTO, entités, service et controller

configuration de module dans user.module.ts pour prendre le controller de l'utilisateur et l'entité de l'utilisateur

puis lancement du server par : npm run start :dev

enfin on teste les routes avec Postman exemple : http://localhost:3000/utilisateurs
