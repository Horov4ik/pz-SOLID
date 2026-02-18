import { IOrderValidator } from '../interfaces';

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
