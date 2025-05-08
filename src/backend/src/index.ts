import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.config';
import path from 'path';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON body parsing

// Auth API routes
app.use('/api/auth', authRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes would go here

// Fallback to index.html for SPA
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 