import { Request, Response } from 'express';
import CreatePayment from '../../../usecases/createPayment';
import PaymentRepository from '../../../infra/repository/payment.repository';

class PaymentController {
  createPayment: CreatePayment;
  paymentRepository: PaymentRepository;

  constructor({
    createPayment,
    paymentRepository,
  }: {
    createPayment: CreatePayment;
    paymentRepository: PaymentRepository;
  }) {
    this.createPayment = createPayment;
    this.paymentRepository = paymentRepository;
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body.order;
      const paymentSuccess = await this.createPayment.execute(payload);

      if (paymentSuccess) {
        payload.orderStatus = 'complete';
        const payment = await this.paymentRepository.create(payload);
        await payment.save();

        res.status(201).json({
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
