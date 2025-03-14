import { Injectable } from '@nestjs/common';
import { Utilisateur } from './entities/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { UpdateUserDto } from './dto/update-utilisateur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Utilisateur> {
    const utilisateur = new Utilisateur();
    utilisateur.name = createUserDto.name;
    utilisateur.email = createUserDto.email;
    utilisateur.password = await bcrypt.hash(createUserDto.password, 10);
    return this.utilisateurRepository.save(utilisateur);
  }

  findAllUser(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async viewUser(id: number): Promise<Utilisateur> {
    const user = await this.utilisateurRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Utilisateur> {
    const user = await this.utilisateurRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.password = updateUserDto.password ?? user.password;
    return this.utilisateurRepository.save(user);
  }

  async removeUser(id: number): Promise<{ affected?: number }> {
    const result = await this.utilisateurRepository.delete(id);
    return { affected: result.affected ?? undefined };
  }
}
