import { Router } from 'express';
import ControllersFactory from '../utils/ControllersFactory';
import { ErrorTypes } from '../utils/errorsCatalog';

const route = Router();

const PRODUCTS_URL = '/produtos';

route.post(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().create(req, res));
route.get(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().read(req, res));

route.all('*', () => { throw Error(ErrorTypes.PageNotFound) });

export default route;
