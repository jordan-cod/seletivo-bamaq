import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mailerConfig } from 'src/config/mailer.config';
import { EmailService } from './services/email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await mailerConfig(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [MailerModule],
})
export class MailerCustomModule {}
