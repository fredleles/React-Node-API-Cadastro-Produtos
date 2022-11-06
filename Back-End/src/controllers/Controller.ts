import { Request, Response } from 'express';
import IServices from '../services/IServices';

export default class Controller<T> {
  constructor(private _service: IServices<T>) {}

  public async read(_req: Request, res: Response) {
    const response = await this._service.read();
    res.status(200).json(response);
  }

  public async create(req: Request, res: Response) {
    const data = req.body;
    const response = await this._service.create(data);
    res.status(201).json(response);
  }
}
