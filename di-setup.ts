import {
  asValue,
  Lifetime,
  asClass,
  asFunction,
  InjectionMode,
  createContainer,
} from 'awilix';
import database from './src/infra/database/mongoose';
import Messenger from './src/utils/messenger.utils';
import PaymentModel from './src/infra/database/models/mongoose/payment.model';
import PaymentRepository from './src/infra/repository/payment.repository';
import CreatePayment from './src/usecases/createPayment';
import PaymentController from './src/interface/http/controllers/payment.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  database: asValue(database),
  messenger: asClass(Messenger),
  paymentModel: asValue(PaymentModel),
  paymentRepository: asClass(PaymentRepository),
  createPayment: asClass(CreatePayment),
  paymentController: asClass(PaymentController),
});

export default container;
