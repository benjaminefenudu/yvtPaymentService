import axios from 'axios';
import PaymentModel from '../infra/database/models/mongoose/payment.model';
import { PaymentDocument } from '../infra/database/models/mongoose/payment.model';

class CreatePayment {
  paymentModel: typeof PaymentModel;

  constructor({
    paymentModel,
  }: {
    paymentModel: typeof PaymentModel;
  }) {
    this.paymentModel = paymentModel;
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
          return response.data.success
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
