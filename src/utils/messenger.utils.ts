import amqp, { Channel, Connection, Message } from 'amqplib';
// import { Status } from "../../domain/order";
// import OrderUseCase from "../../usecases/OrderUseCase";

export interface IMessenger {
  createChannel(): Promise<void>;
  sendToQueue(queue: string, content: Object): void;
  assertQueue(queue: string): Promise<void>;
}

export class Messenger implements IMessenger {
  channel!: Channel;

  constructor() {}

  async createChannel(): Promise<void> {
    const amqp_url = process.env.AMQP_URL || '';
    const connection: Connection = await amqp.connect(amqp_url);

    this.channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  }

  async assertQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: false,
    });
  }

  sendToQueue(queue: string, content: Object): void {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
  }
}

export default Messenger;
