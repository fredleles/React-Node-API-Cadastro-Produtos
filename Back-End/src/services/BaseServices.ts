import { IModel } from '../models/IModel';
import IServices from './IServices';
import { ErrorTypes } from '../utils/errorsCatalog';

export default abstract class BaseServices<T> implements IServices<T> {
  protected _model: IModel<T>;

  constructor(model: IModel<T>) {
    this._model = model;
  }  

  async delete(_id: string): Promise<void> {
    const response = await this._model.delete(_id);
    if (!response) throw Error(ErrorTypes.EntityNotFound);
  }

  async update(_id: string, obj: unknown): Promise<T | null> {
    if (!obj || JSON.stringify(obj) === '{}') throw Error(ErrorTypes.InputParametersNotFound);
    const edited = await this._model.update(_id, obj as T);
    if (!edited) throw Error(ErrorTypes.EntityNotFound);
  
    const response = await this._model.readOne(_id);
    return response;
  }

  async readOne(_id:string):Promise<T | null> {
    const response = await this._model.readOne(_id);
    if (!response) throw Error(ErrorTypes.EntityNotFound);
    return response;
  }

  read(): Promise<T[]> {
    return this._model.read();
  }

  abstract create(obj:unknown) : Promise<T>;
}
