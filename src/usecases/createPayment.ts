import axios from 'axios';
import PaymentModel from '../infra/database/models/mongoose/payment.model';
import PaymentRepository from '../infra/repository/payment.repository';
import { PaymentDocument } from '../infra/database/models/mongoose/payment.model';

class CreatePayment {
  paymentModel: typeof PaymentModel;
  paymentRepository: PaymentRepository;

  constructor({
    paymentModel,
    paymentRepository,
  }: {
    paymentModel: typeof PaymentModel;
    paymentRepository: PaymentRepository;
  }) {
    this.paymentModel = paymentModel;
    this.paymentRepository = paymentRepository;
  }

  async execute(payload: PaymentDocument) {
    try {
      // check if customer has sufficient funds
      const paymentSuccess = axios
        .post(`${process.env.CUSTOMER_SERVICE_URL}/pay`, {
          customerId: payload.customerId,
          amount: payload.amount,
        })
        .then(async (response) => {
          if (response.data.success) {
            payload.orderStatus = 'complete';
            const payment = await this.paymentRepository.create(payload);

            return  payment;
          } else {
            console.log('Insufficient funds');
            return;
          }
        })
        .catch((error) => {
          console.log('error: ', error?.message);
        });
      return paymentSuccess;
    } catch (error) {
      throw error;
    }
  }
}

export default CreatePayment;
