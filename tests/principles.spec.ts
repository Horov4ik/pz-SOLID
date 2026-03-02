import { OrderValidator, OrderCalculator as SRPOrderCalculator, SimpleEmailService as SRPEmailService, InMemoryOrderRepository as SRPRepo } from '../src/principles/SRP/SRP';
import { OrderCalculator, DiscountedOrderCalculator } from '../src/principles/OCP/OCP';
import { InMemoryOrderRepository } from '../src/principles/LSP/LSP';
import { OrderProcessor as DIPOrderProcessor } from '../src/principles/DIP/DIP';
import { OrderValidator as ISPValidator, SimpleEmailService as ISPEmail } from '../src/principles/ISP/ISP';

describe('SOLID principles - principles folder', () => {
  test('SRP: validator throws on invalid order and calculator sums correctly', () => {
    const validator = new OrderValidator();
    expect(() => validator.validate(null)).toThrow();

    const calc = new SRPOrderCalculator();
    const order = { items: [{ price: 5, qty: 3 }, { price: 2, qty: 4 }] };
    expect(calc.calculate(order)).toBe(5 * 3 + 2 * 4);
  });

  test('OCP: DiscountedOrderCalculator extends without changing base', () => {
    const base = new OrderCalculator();
    const order = { items: [{ price: 10, qty: 1 }] };
    expect(base.calculate(order)).toBe(10);

    const discounted = new DiscountedOrderCalculator(50); // 50% off
    expect(discounted.calculate(order)).toBe(5);
  });

  test('LSP: InMemoryOrderRepository implements save without breaking contract', async () => {
    const repo = new InMemoryOrderRepository();
    await expect(repo.save({ id: 'x' })).resolves.toBeUndefined();
  });

  test('ISP + DIP: OrderProcessor works with injected narrow interfaces', async () => {
    const validator = new ISPValidator();
    const calculator = new OrderCalculator();
    const repo = new SRPRepo();
    const email = new ISPEmail();
    const processor = new DIPOrderProcessor(validator, calculator, repo, email);

    const order = { id: '1', email: 't@t.com', items: [{ price: 3, qty: 3 }] };
    const res = await processor.process(order);
    expect(res.total).toBe(9);
    expect(res.orderId).toBe('1');
  });
});
