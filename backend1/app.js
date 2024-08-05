import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './contactRoutes.js';
import feedbackController from './feedbackController.js'; // Import the feedback controller


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace 'your_connection_string' with your actual connection string)
mongoose.connect('mongodb+srv://siddahyndavi:Lf2QT5QBS5hwaRMZ@cluster0.5ljjhb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Image URLs array (replace with your actual image URLs)
const imageUrls = [
  'https://img.freepik.com/free-photo/3d-portrait-business-people_23-2150793953.jpg?t=st=1701872564~exp=1701876164~hmac=7f7aa1ed517334c0ea5b775fcb8dbbd4c3fec7fe8f2da886e3289c553541662c&w=826',
  'https://img.freepik.com/premium-vector/online-education-concept-3d-illustration-video-lectures-lessons-educational-platform-viewing-webinars-video-chats-with-teachers-elearning-vector-illustration-modern-web-banner-design_198565-1717.jpg',
  'https://quotefancy.com/media/wallpaper/3840x2160/50568-Daniel-J-Boorstin-Quote-Education-is-learning-what-you-didn-t-even.jpg',
    // Add more image URLs as needed
  
];

// API endpoint to get image URLs
app.get('/images', (req, res) => {
  res.json(imageUrls);
});

// MongoDB model for user registration
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  });
  
  // Create User model
  const User = mongoose.model('User', userSchema);
  
  // Routes
  app.post('/register', async (req, res) => {
    try {
      // Validate and save user registration data to MongoDB
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error registering:', error);
      res.status(500).json({ message: 'Registration failed.' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      // Validate user login data by checking against MongoDB
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (user) {
        res.json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Login failed.' });
    }
  });
  app.use(contactRoutes);
  app.use('/api', feedbackController);


  
  // Start server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// PRmSBlbB447YwfSb
