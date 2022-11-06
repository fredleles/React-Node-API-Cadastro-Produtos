import Controller from '../controllers/Controller';
import ProductsServices from '../services/ProductsServices';
import ProductsModel from '../models/ProductModel';

export default class ControllersFactory {
  static GetProductsController() {
    return new Controller(this.GetProductsServices());
  }

  private static GetProductsServices() {
    return new ProductsServices(this.GetProductsModel());
  }

  private static GetProductsModel() {
    return new ProductsModel();
  }
}
