import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json()); // for parsing JSON bodies
app.use(
  cors({
    origin: 'http://localhost:4321',
  })
);

// Payment route
app.post('/payment-service', (req, res, next) => {
  try {
    const userId = '12345';
    // TODO: payment logic here

    // Simulate payment success
    res.status(200).json({ message: 'Payment processed successfully', userId });
  } catch (err) {
    next(err); // forward to error middleware
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // skip if response already sent
  }
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

// Start server
app.listen(8000, () => {
  console.log('Payment service is running on port 8000');
});
