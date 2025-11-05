import { Kafka } from 'kafkajs';
const kafka = new Kafka({
  clientId: 'analytic-service',
  brokers: ['localhost:9092'],
});
const consumer = kafka.consumer({
  groupId: 'analytic-service',
});
const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payment = JSON.parse(message.value.toString());
        console.log({ topic, partition, payment });
      },
    });
  } catch (err) {
    console.error('Failed to connect to Kafka consumer:', err);
    throw err;
  }
};
run();
