import 'dotenv/config';
import app from './app';
import connectToDatabase from './models/connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('DB Connection error:\r\n');
    console.error(error);
    process.exit(0);
  });
  