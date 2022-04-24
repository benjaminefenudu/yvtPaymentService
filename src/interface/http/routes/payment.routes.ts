import { Request, Response, Router } from 'express';
import container from '../../../../di-setup';

const { paymentController } = container.cradle;

const PaymentRouter = Router();

PaymentRouter.post('/', (req: Request, res: Response) =>
  paymentController.create(req, res)
);

export default PaymentRouter;
