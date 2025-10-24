import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({
  origin: 'http://localhost:4321',
}));
app.post('/payment-service', (req, res) =>
{
  res.send('Payment service is up and running!');
  const { cart } = req.body
  const userId = '12345'
  // TODO :payment 

  // KAFKA
  return res.status(200).send(JSON.stringify({ message: 'Payment processed successfully' }));
});
app.use((err, req, res, next) =>
{
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});
app.listen(8000, () =>
{
  console.log('Payment service is running on port 8000');
});