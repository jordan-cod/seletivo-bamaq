import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from 'src/common/utils/hash-password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { nome, telefone, email, senha } = createUserDto;

    const userExists = await this.userRepository.findOne({
      where: [{ email }, { telefone }],
    });

    if (userExists) {
      throw new ConflictException('Telefone ou e-mail já estão em uso!');
    }

    const user = this.userRepository.create({
      nome,
      telefone,
      email,
      senha: await hashPassword(senha),
    });

    await this.userRepository.save(user);
  }
}
