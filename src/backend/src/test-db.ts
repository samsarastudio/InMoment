import connectDB from './config/database.config';
import User from './models/User';
import Gallery from './models/Gallery';
import Portfolio from './models/Portfolio';

async function testDatabase() {
  try {
    // Connect to database
    await connectDB();
    console.log('Database connection successful');

    // Create a test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'photographer'
    });
    console.log('Test user created:', user.email);

    // Create a test gallery
    const gallery = await Gallery.create({
      title: 'Test Gallery',
      description: 'A test gallery',
      photographer: user._id,
      photos: [{
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        key: 'test/photo.jpg',
        thumbnailKey: 'test/thumb.jpg'
      }]
    });
    console.log('Test gallery created:', gallery.title);

    // Create a test portfolio
    const portfolio = await Portfolio.create({
      photographer: user._id,
      title: 'Test Portfolio',
      description: 'A test portfolio',
      items: [{
        title: 'Test Item',
        imageUrl: 'https://example.com/portfolio.jpg',
        thumbnailUrl: 'https://example.com/portfolio-thumb.jpg',
        imageKey: 'portfolio/image.jpg',
        thumbnailKey: 'portfolio/thumb.jpg',
        category: 'Nature'
      }],
      categories: ['Nature']
    });
    console.log('Test portfolio created:', portfolio.title);

    // Clean up test data
    await User.deleteOne({ email: 'test@example.com' });
    await Gallery.deleteOne({ title: 'Test Gallery' });
    await Portfolio.deleteOne({ title: 'Test Portfolio' });
    console.log('Test data cleaned up');

  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    process.exit(0);
  }
}

testDatabase(); 