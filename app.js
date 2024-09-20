import express from 'express';
import syncDatabase from './models/sync.js';
import authRoutes from './routes/authRoutes.js';
import { authenticateJWT } from './middlewares/authMiddleware.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

//Sync database
syncDatabase().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error while database sync', err);
});

//Error handlings
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


export default app;
