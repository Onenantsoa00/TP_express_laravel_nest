// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Utilisateur from "App/Models/Utilisateur";

export default class UtilisateursController {
  public async index() {
    const users = await Utilisateur.all();
    return users;
  }

  public async show({ params }) {
    const user = await Utilisateur.find(params.id);
    return user;
  }

  public async store({ request, response }) {
    const data = request.only(["name", "email", "password"]);
    const existingUser = await Utilisateur.findBy("email", data.email);
    if (existingUser) {
      return response.badRequest({ message: "Email already in use" });
    }
    const user = await Utilisateur.create(data);
    return user;
  }

  public async update({ params, request, response }) {
    const user = await Utilisateur.findOrFail(params.id);
    const data = request.only(["name", "email", "password"]);
    const existingUser = await Utilisateur.query()
      .where("email", data.email)
      .whereNot("id", params.id)
      .first();
    if (existingUser) {
      return response.badRequest({ message: "Email already in use" });
    }
    user.merge(data);
    await user.save();
    return user;
  }

  public async destroy({ params }) {
    const user = await Utilisateur.findOrFail(params.id);
    await user.delete();
    return { message: "User deleted successfully" };
  }
}
