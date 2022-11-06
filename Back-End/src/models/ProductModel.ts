import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IProduct } from './IProduct';
import BaseModel from './BaseModel';

const productsSchema = new Schema<IProduct>(
  {
    produto: String,
    valor: Number,
    descricao: String,
    created: Date,
    updated: Date,
  },
  { versionKey: false },
);

class ProductsModel extends BaseModel<IProduct> {
  constructor(model = mongooseCreateModel('Products', productsSchema)) {
    super(model);
  }
}

export default ProductsModel;
