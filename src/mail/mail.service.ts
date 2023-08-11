import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/schemas/admin.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcom to Farmer App! Confirm your Email',
      template: './confirmation',
      context: {
        name: admin.full_name,
        url,
      },
    });
  }
}
