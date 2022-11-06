import { ProductsZodSchema, IProduct } from '../models/IProduct';
import BaseServices from './BaseServices';

export default class ProductsServices extends BaseServices<IProduct> {
  create(obj:unknown) : Promise<IProduct> {
    // validação dos dados do usuário
    const parsed = ProductsZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create({
      ...parsed.data,
      created: new Date(Date.now()),
      updated: new Date(Date.now()),
    });
  }
}
