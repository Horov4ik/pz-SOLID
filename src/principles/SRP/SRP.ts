// ПАПКА: SRP (Single Responsibility Principle)
// У цьому файлі показано приклади класів, кожен з яких має одну відповідальність.
// Класи скопійовані з рефактореного коду та призначені для ілюстрації SRP.

export class OrderValidator {
  // Відповідальність: валідація замовлення
  validate(order: any): void {
    if (!order || !order.items || order.items.length === 0) {
      throw new Error('Invalid order');
    }
    if (!order.email) {
      throw new Error('Missing email');
    }
  }
}

export class OrderCalculator {
  // Відповідальність: обчислення загальної суми замовлення
  calculate(order: any): number {
    return order.items.reduce((s: number, it: any) => s + it.price * it.qty, 0);
  }
}

export class SimpleEmailService {
  // Відповідальність: надсилання email-повідомлень
  async send(to: string, body: string): Promise<void> {
    // Симуляція відправки email. У реальному застосунку потрібно інжектувати SMTP клієнт
    console.log(`Email sent to ${to}: ${body}`);
    return Promise.resolve();
  }
}

export class InMemoryOrderRepository {
  // Відповідальність: збереження замовлень в оперативній пам'яті
  private store: any[] = [];

  async save(order: any): Promise<void> {
    this.store.push(order);
    return Promise.resolve();
  }
}
