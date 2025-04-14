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
import { UpdateUserDto } from '../dto/update-user.dto';
import { EmailService } from 'src/modules/email/services/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{
    user: UserEntity;
    emailFailed: boolean;
  }> {
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

    const emailSent = await this.emailService.sendWelcomeEmail(nome, email);
    if (!emailSent) {
      console.warn(`Falha ao enviar e-mail para ${email}`);
      return { user, emailFailed: true };
    }

    return { user, emailFailed: false };
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserBy(criteria: UserSearchCriteria): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: criteria,
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    const { nome, telefone, email, senha } = updateUserDto;

    if (email && email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email },
      });
      if (existingEmail) {
        throw new ConflictException('Email já cadastrado.');
      }
    }

    if (telefone && telefone !== user.telefone) {
      const existingPhone = await this.userRepository.findOne({
        where: { telefone },
      });
      if (existingPhone) {
        throw new ConflictException('Telefone já cadastrado.');
      }
    }

    if (nome) user.nome = nome;
    if (telefone) user.telefone = telefone;
    if (email) user.email = email;
    if (senha) user.senha = await hashPassword(senha);

    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    await this.userRepository.remove(user);
  }
}
