import PaymentModel, {
  PaymentDocument,
} from '../database/models/mongoose/payment.model';

class PaymentRepository {
  paymentModel: typeof PaymentModel;

  constructor({ paymentModel }: { paymentModel: typeof PaymentModel }) {
    this.paymentModel = paymentModel;
  }

  async create(payload: PaymentDocument) {
    try {
      const payment = await this.paymentModel.create(payload);
      const savedPayment = await payment.save();
      return savedPayment;
    } catch (error) {
      throw error;
    }
  }
}

export default PaymentRepository;
