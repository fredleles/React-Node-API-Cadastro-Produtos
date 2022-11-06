import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI,
) => mongoose.connect(mongoDatabaseURI!);

export default connectToDatabase;

// docker run -d -it -p 27017:27017 -v /data/db --name mongoContainer mongo:5.0.7
