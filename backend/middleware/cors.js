import cors from 'cors';

const allowedOrigins = [
  'http://localhost:19006', // your Expo frontend
  // add production frontend URL later
];

const corsMiddleware = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you plan to use cookies/auth headers
});

export default corsMiddleware;