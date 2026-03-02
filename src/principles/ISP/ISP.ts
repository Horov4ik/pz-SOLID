// ПАПКА: ISP (Interface Segregation Principle)
// Інтерфейси повинні бути вузькими та специфічними — клієнти не повинні залежати від методів, яких не використовують.

// У проекті інтерфейси розбиті на IOrderValidator, IOrderCalculator, IOrderRepository, IEmailService
// Це приклад ISP: кожен сервіс залежить лише від потрібної абстракції.

import { IOrderValidator, IEmailService } from '../../interfaces';

export class OrderValidator implements IOrderValidator {
  validate(order: any): void {
    if (!order || !order.items || order.items.length === 0) {
      throw new Error('Invalid order');
    }
    if (!order.email) {
      throw new Error('Missing email');
    }
  }
}

export class SimpleEmailService implements IEmailService {
  async send(to: string, body: string): Promise<void> {
    console.log(`Email sent to ${to}: ${body}`);
    return Promise.resolve();
  }
}
