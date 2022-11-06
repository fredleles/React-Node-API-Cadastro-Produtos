import { Model } from 'mongoose';
import { IModel } from './IModel';

abstract class BaseModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }
  readOne(_id: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  update(_id: string, obj: T): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }
}

export default BaseModel;
