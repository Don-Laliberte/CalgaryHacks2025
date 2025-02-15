import dbConnect from '../../lib/dbConnect';
import Question from '../../components/Mongo Questions';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const questions = await Question.find({}).sort({ id: 1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
} 