import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs';
import rateLimit from 'express-rate-limit'; // Importa la librería
import type { CorsOptions } from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración del Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Permite 100 solicitudes por IP en 15 minutos
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const whitelist = process.env.ALLOWED_ORIGINS?.split(',') || [];

// ✅ CORS con validación personalizada
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
  const apiKey = req.get('x-api-key');
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplica el Rate Limiter a la ruta /api
app.use('/api', apiLimiter, jobsRouter); // Aplica el limiter antes del router de jobs

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
