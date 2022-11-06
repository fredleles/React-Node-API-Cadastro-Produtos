import { Router } from 'express';
import ControllersFactory from '../utils/ControllersFactory';
import { ErrorTypes } from '../utils/errorsCatalog';

const route = Router();

const PRODUCTS_URL = '/produtos';
const PRODUCTS_ID_URL = '/produtos/:id';

route.delete(PRODUCTS_ID_URL, (req, res) => ControllersFactory.GetProductsController().delete(req, res));
route.put(PRODUCTS_ID_URL, (req, res) => ControllersFactory.GetProductsController().update(req, res));
route.patch(PRODUCTS_ID_URL, (req, res) => ControllersFactory.GetProductsController().update(req, res));
route.get(PRODUCTS_ID_URL, (req, res) => ControllersFactory.GetProductsController().readOne(req, res));
route.post(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().create(req, res));
route.get(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().read(req, res));

route.all('*', () => { throw Error(ErrorTypes.PageNotFound) });

export default route;
