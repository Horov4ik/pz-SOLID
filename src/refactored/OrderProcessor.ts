import { IOrderValidator, IOrderCalculator, IOrderRepository, IEmailService } from '../interfaces';

export class OrderProcessor {
  constructor(
    private validator: IOrderValidator,
    private calculator: IOrderCalculator,
    private repository: IOrderRepository,
    private emailService: IEmailService
  ) {}

  async process(order: any) {
    this.validator.validate(order);

    const total = this.calculator.calculate(order);

    await this.repository.save({ ...order, total });

    await this.emailService.send(order.email, `Order processed: ${total}`);

    return { orderId: order.id, total };
  }
}
