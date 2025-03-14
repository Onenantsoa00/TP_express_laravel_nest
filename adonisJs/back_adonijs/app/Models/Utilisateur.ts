import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { BaseModel, column, beforeSave } from "@ioc:Adonis/Lucid/Orm";

export default class Utilisateur extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(utilisateur: Utilisateur) {
    if (utilisateur.$dirty.password) {
      utilisateur.password = await Hash.make(utilisateur.password);
    }
  }
}
