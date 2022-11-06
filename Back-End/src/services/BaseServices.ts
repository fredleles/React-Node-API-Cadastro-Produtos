import { IModel } from '../models/IModel';
import IServices from './IServices';

export default abstract class BaseServices<T> implements IServices<T> {
  protected _model: IModel<T>;

  constructor(model: IModel<T>) {
    this._model = model;
  }

  readOne(_id: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  update(_id: string, obj: unknown): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  
  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  read(): Promise<T[]> {
    return this._model.read();
  }

  abstract create(obj:unknown) : Promise<T>;
}
