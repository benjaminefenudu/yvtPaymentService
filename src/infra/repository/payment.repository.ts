import PaymentModel, {
  PaymentDocument,
} from '../database/models/mongoose/payment.model';
import Messenger from '../../utils/messenger.utils';

class PaymentRepository {
  paymentModel: typeof PaymentModel;
  messenger: Messenger;

  constructor({
    paymentModel,
    messenger,
  }: {
    paymentModel: typeof PaymentModel;
    messenger: Messenger;
  }) {
    this.paymentModel = paymentModel;
    this.messenger = messenger;
  }

  async create(payload: PaymentDocument) {
    try {
      const savedPayment = await this.paymentModel.create(payload);
      const payment = await savedPayment.save();

      if (!payment) return;
      
      // send transaction details to RabbitMQ queue
      this.messenger.sendToQueue(`transaction_details`, {
        payment,
      });

      return payment;
    } catch (error) {
      throw error;
    }
  }
}

export default PaymentRepository;
