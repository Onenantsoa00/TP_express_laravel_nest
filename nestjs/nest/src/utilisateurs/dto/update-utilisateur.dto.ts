import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-utilisateur.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
