import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { Utilisateur } from './entities/utilisateur.entity';
import { CreateUserDto } from './dto/create-utilisateur.dto';
import { UpdateUserDto } from './dto/update-utilisateur.dto';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.utilisateursService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.utilisateursService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateursService.viewUser(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.utilisateursService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateursService.removeUser(+id);
  }
}
