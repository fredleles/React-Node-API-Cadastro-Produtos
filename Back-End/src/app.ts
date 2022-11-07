import express from 'express';
import 'express-async-errors';
import routes from './controllers/routes';
import errorHandler from './utils/errorsHandler';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;
