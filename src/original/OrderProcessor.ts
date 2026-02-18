// Anti-SOLID: один великий клас робить багато речей
export class OrderProcessor {
  process(order: any) {
    // валідація
    if (!order || !order.items || order.items.length === 0) {
      throw new Error('Invalid order');
    }

    // розрахунок суми
    let total = 0;
    for (const it of order.items) {
      total += it.price * it.qty;
    }

    // збереження в базу (імітація)
    this.saveToDatabase({ order, total });

    // відправка email
    this.sendEmail(order.email, `Order processed: ${total}`);

    // вивід в консоль
    console.log('Order processed', { orderId: order.id, total });

    return { orderId: order.id, total };
  }

  saveToDatabase(payload: any) {
    // циклічна залежність або монолітна реалізація
    // ... imagine DB code
    console.log('Saved to DB', payload);
  }

  sendEmail(to: string, body: string) {
    // imagine SMTP call
    console.log('Email sent to', to, body);
  }
}
