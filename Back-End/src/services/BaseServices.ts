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
    const edited = await this._model.update(_id, { ...obj, updated: Date.now() } as T);
    if (!edited) throw Error(ErrorTypes.EntityNotFound);
  
    const response = await this._model.readOne(_id);
    return response;
  }

  async readOne(_id:string):Promise<T | null> {
    const response = await this._model.readOne(_id);
    if (!response) throw Error(ErrorTypes.EntityNotFound);
    return response;
  }

  async read(): Promise<T[]> {
    return this._model.read({});
  }

  async find(query: unknown): Promise<T[]> {
    if (!query || query === '') throw Error(ErrorTypes.InputParametersNotFound);
    const words = query.toString().split('-');

    const searchList = words.map((word) => {
      const searchRgx = new RegExp(word + '', 'i');
      return ({
        $or: [
          { produto: { $regex: searchRgx } },
          { descricao: { $regex: searchRgx } },
          { tipo: { $regex: searchRgx } },
        ],
      });
    });

    const opt = { $and: searchList };
    return this._model.read(opt);
  }

  abstract create(obj:unknown) : Promise<T>;
}
