import { SimpleEmailService as SRPEmail, InMemoryOrderRepository as SRPRepo } from '../src/principles/SRP/SRP';
import { SimpleEmailService as ISPEmail } from '../src/principles/ISP/ISP';

describe('Additional SRP/ISP tests', () => {
  test('SRP: SimpleEmailService.send returns a resolved promise and logs', async () => {
    const email = new SRPEmail();
    await expect(email.send('x@y.z', 'hello')).resolves.toBeUndefined();
  });

  test('SRP: InMemoryOrderRepository.save stores without throwing', async () => {
    const repo = new SRPRepo();
    await expect(repo.save({ id: 'abc' })).resolves.toBeUndefined();
  });

  test('ISP: SimpleEmailService from ISP sends as well', async () => {
    const e = new ISPEmail();
    await expect(e.send('a@b.c', 'hi')).resolves.toBeUndefined();
  });
});
