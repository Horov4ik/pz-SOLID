import { IEmailService } from '../interfaces';

export class SimpleEmailService implements IEmailService {
  async send(to: string, body: string): Promise<void> {
    // simulate sending email
    // In real scenario, inject SMTP client
    console.log(`Email sent to ${to}: ${body}`);
    return Promise.resolve();
  }
}
