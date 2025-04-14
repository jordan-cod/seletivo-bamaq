import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from 'src/common/utils/hash-password.util';
import { UserSearchCriteria } from '../@types/user-search.type';

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

  async getAllUsers(): Promise<Omit<UserEntity, 'senha'>[]> {
    // Queria usar o `excludes` como o sequelize faz, mas não consegui fazer utilizando o typeorm
    return this.userRepository.find({
      select: ['id', 'nome', 'telefone', 'email'],
    });
  }

  async getUserBy(criteria: UserSearchCriteria): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: criteria,
      select: ['id', 'nome', 'telefone', 'email'],
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    await this.userRepository.remove(user);
  }
}
