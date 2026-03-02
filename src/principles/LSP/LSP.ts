// ПАПКА: LSP (Liskov Substitution Principle)
// Правило: підкласи повинні повністю заміщати базові класи/інтерфейси без зміни очікуваної поведінки.

import { IOrderRepository } from '../../interfaces';

export class InMemoryOrderRepository implements IOrderRepository {
  private store: any[] = [];

  async save(order: any): Promise<void> {
    // Поведінка відповідає контрасту інтерфейсу: зберігає асинхронно
    this.store.push(order);
    return Promise.resolve();
  }
}

// Підклас повинен зберігати ті самі контрактні властивості й не кидати неочікувані помилки
export class FaultyRepository /* не відповідає IOrderRepository */ {
  // Приклад порушення LSP — змінює підпис методу або кидає інші помилки
}
