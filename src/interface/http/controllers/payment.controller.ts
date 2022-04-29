import { Request, Response } from 'express';
import CreatePayment from '../../../usecases/makePayment';
import PaymentRepository from '../../../infra/repository/payment.repository';

class PaymentController {
  createPayment: CreatePayment;
  paymentRepository: PaymentRepository;

  constructor({
    createPayment,
    paymentRepository
  }: {
    createPayment: CreatePayment;
    paymentRepository: PaymentRepository;
  }) {
    this.createPayment = createPayment;
    this.paymentRepository = paymentRepository
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body.order;
      const paymentSuccess = await this.createPayment.execute(payload);

      if (!paymentSuccess) {
        return res.status(200).json({
          success: false,
          msg: `Insufficient funds`,
          paymentSuccess,
        });
      }

      payload.orderStatus = 'complete';
      const payment = await this.paymentRepository.create(payload);

      return res.status(200).json({
        success: true,
        msg: `Payment successful`,
        paymentSuccess,
        payment,
      });
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
