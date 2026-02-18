export interface IOrderValidator {
  validate(order: any): void;
}

export interface IOrderCalculator {
  calculate(order: any): number;
}

export interface IOrderRepository {
  save(order: any): Promise<void>;
}

export interface IEmailService {
  send(to: string, body: string): Promise<void>;
}
