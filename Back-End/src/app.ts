import express from 'express';
import 'express-async-errors';
import routes from './controllers/routes';
import errorHandler from './utils/errorsHandler';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
