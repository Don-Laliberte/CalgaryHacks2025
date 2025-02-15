import dbConnect from '../lib/dbConnect';
import Question from '../components/Mongo Questions';

const questions = [
  // Your existing questions array
];

async function seedDatabase() {
  try {
    await dbConnect();
    await Question.deleteMany({}); // Clear existing questions
    await Question.insertMany(questions);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 