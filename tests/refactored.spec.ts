import { OrderProcessor } from '../src/refactored/OrderProcessor';
import { OrderValidator } from '../src/refactored/OrderValidator';
import { OrderCalculator } from '../src/refactored/OrderCalculator';
import { InMemoryOrderRepository } from '../src/refactored/InMemoryOrderRepository';
import { SimpleEmailService } from '../src/refactored/SimpleEmailService';

describe('Refactored OrderProcessor', () => {
  const validator = new OrderValidator();
  const calculator = new OrderCalculator();
  const repo = new InMemoryOrderRepository();
  const email = new SimpleEmailService();
  const processor = new OrderProcessor(validator, calculator, repo, email);

  test('processes a valid order', async () => {
    const order = { id: '1', email: 'a@b.com', items: [{ price: 10, qty: 2 }] };
    const res = await processor.process(order);
    expect(res.total).toBe(20);
    expect(res.orderId).toBe('1');
  });

  test('throws on invalid order', async () => {
    const order = { id: '2', items: [] };
    await expect(processor.process(order)).rejects.toThrow();
  });
});
