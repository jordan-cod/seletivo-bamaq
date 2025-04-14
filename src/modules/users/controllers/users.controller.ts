import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UuidValidation } from 'src/common/decorators/uuid-vallidation.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
    return { message: 'Usuário criado com sucesso!' };
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@UuidValidation() id: string) {
    const user = await this.userService.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  //   @Put(':id')
  //   async updateUser(@Body() id: string, @Body() updateUserDto: CreateUserDto) {
  //     return await this.userService.updateUser(id, updateUserDto);
  //   }

  @Delete(':id')
  async deleteUser(@UuidValidation() id: string) {
    await this.userService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
