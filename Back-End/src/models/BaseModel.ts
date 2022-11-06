import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from './IModel';
import { ErrorTypes } from '../utils/errorsCatalog';

abstract class BaseModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }  

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndUpdate({ _id }, { ...obj } as UpdateQuery<T>);
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndDelete({ _id });
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }
}

export default BaseModel;
