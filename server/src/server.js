import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import env from './config/env.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use(errorHandler);

// Connect DB when the serverless function spins up
connectDB();

if (process.env.NODE_ENV !== 'production') {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

export default app;
