import { IOrderRepository } from '../interfaces';

export class InMemoryOrderRepository implements IOrderRepository {
  private store: any[] = [];

  async save(order: any): Promise<void> {
    this.store.push(order);
    // simulate async
    return Promise.resolve();
  }
}
