import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Utilisateur from "App/Models/Utilisateur";

export default class UtilisateurSeeder extends BaseSeeder {
  public async run() {
    await Utilisateur.createMany([
      {
        name: "test",
        email: "mitest@gmail.com",
        password: "00000000",
      },
    ]);
  }
}
