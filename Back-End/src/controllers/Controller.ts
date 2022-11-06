import { Request, Response } from 'express';
import IServices from '../services/IServices';

export default class Controller<T> {
  constructor(private _service: IServices<T>) {}

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    res.status(204).end();
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const response = await this._service.update(id, data);
    res.status(200).json(response);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._service.readOne(id);
    res.status(200).json(response);
  }

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
