// ПАПКА: OCP (Open/Closed Principle)
// Код відповідає OCP: існуючі класи не змінюються при розширенні функціоналу.
// Приклад: OrderCalculator реалізує інтерфейс і може бути замінений новим калькулятором без змін в OrderProcessor.

import { IOrderCalculator } from '../../interfaces';

export class OrderCalculator implements IOrderCalculator {
  calculate(order: any): number {
    return order.items.reduce((s: number, it: any) => s + it.price * it.qty, 0);
  }
}

// Для розширення: можна додати новий клас DiscountedOrderCalculator, не змінюючи існуючий код
export class DiscountedOrderCalculator implements IOrderCalculator {
  constructor(private discountPercent: number) {}

  calculate(order: any): number {
    const total = order.items.reduce((s: number, it: any) => s + it.price * it.qty, 0);
    return total - (total * this.discountPercent) / 100;
  }
}
