import { IOrderCalculator } from '../interfaces';

export class OrderCalculator implements IOrderCalculator {
  calculate(order: any): number {
    return order.items.reduce((s: number, it: any) => s + it.price * it.qty, 0);
  }
}
