import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Utilisateurs extends BaseSchema {
  protected tableName = "utilisateurs";

  public async up() {
    this.schema.dropTableIfExists(this.tableName);
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.string("email").unique();
      table.string("password");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
