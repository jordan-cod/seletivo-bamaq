import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

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

  //   @Get(':id')
  //   async getUserById(@Body() id: string) {
  //     return await this.userService.getUserById(id);
  //   }

  //   @Put(':id')
  //   async updateUser(@Body() id: string, @Body() updateUserDto: CreateUserDto) {
  //     return await this.userService.updateUser(id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   deleteUser(@Body() id: string) {
  //     await this.userService.deleteUser(id);
  //     return { message: 'Usuário deletado com sucesso!' };
  //   }
}
