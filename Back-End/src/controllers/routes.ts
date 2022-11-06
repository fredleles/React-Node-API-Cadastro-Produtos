import { Router } from 'express';
import ControllersFactory from '../utils/ControllersFactory';

const route = Router();

const PRODUCTS_URL = '/produtos';

route.post(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().create(req, res));
route.get(PRODUCTS_URL, (req, res) => ControllersFactory.GetProductsController().read(req, res));

export default route;
