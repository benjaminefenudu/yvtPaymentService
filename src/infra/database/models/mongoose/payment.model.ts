import mongoose from 'mongoose';

export interface PaymentDetails {
  customerId: string;
  productId: string;
  orderId: string,
  amount: number;
  quantity: number,
  orderStatus: string
}

export interface PaymentDocument extends PaymentDetails, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model<PaymentDocument>('Payment', paymentSchema);

export default PaymentModel;
