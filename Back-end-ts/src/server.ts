import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

// Import routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes'

// Import middleware
// import { errorHandler } from './middleware/errorHandler';
// import { notFound } from './middleware/notFound';


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Segurança para headers HTTP
app.use(cors()); // Habilita CORS
app.use(morgan('dev')); // Logging de requisições
app.use(express.json()); // Parse de JSON no body
app.use(express.urlencoded())

// Routes
app.use('/users', userRoutes);
app.use('/post', postRoutes)

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;