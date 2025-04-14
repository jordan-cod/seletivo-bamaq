import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(
    userName: string,
    userEmail: string,
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Bem-vindo ao sistema!',
        text: `Olá ${userName},\nBem-vindo ao nosso sistema! Estamos felizes em tê-lo conosco.`,
        html: `<p>Olá ${userName},</p><p>Bem-vindo ao nosso sistema! Estamos felizes em tê-lo conosco.</p>`,
      });
      return true;
    } catch (error) {
      console.error(
        `Erro ao enviar e-mail para ${userEmail}: ${error.message}`,
      );
      return false;
    }
  }
}
