import express from 'express';
import dotenv from "dotenv"
dotenv.config()

const app = express();
import container from '../../../di-setup';
const { database, messenger } = container.cradle;

database();
messenger.createChannel();

const PORT = process.env.PORT || 4003

app.use(express.json());
import paymentRouter from './routes/payment.routes';

// Set test page
app.get('/', (req, res) => {
  res.send('<h1>Payment Service<h1>');
});

app.use('/v1/payments', paymentRouter);

app.listen(PORT, () => {
  console.log(`Payment Service listening on Port ${PORT}...`);
});
