import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utilisateurs')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 250, name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 250, name: 'password' })
  password: string;
}
