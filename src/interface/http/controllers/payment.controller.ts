import { Request, Response } from 'express';
import CreatePayment from '../../../usecases/createPayment';
import PaymentRepository from '../../../infra/repository/payment.repository';

class PaymentController {
  createPayment: CreatePayment;

  constructor({ createPayment }: { createPayment: CreatePayment }) {
    this.createPayment = createPayment;
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body.order;
      const payment = await this.createPayment.execute(payload);

      if (!payment) {
        return res.status(400).json({
          success: false,
          msg: `Insufficient funds`,
        });
      }

      if (payment) {
        return res.status(201).json({
          success: true,
          msg: `Payment successful`,
          payment: payment,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }
}

export default PaymentController;
