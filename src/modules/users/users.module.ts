import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MailerCustomModule } from '../email/email.module';
import { EmailService } from '../email/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailerCustomModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
