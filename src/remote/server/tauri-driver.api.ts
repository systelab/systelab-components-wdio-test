import {Request, Response} from 'express';
import {TauriDriverUtility} from '../../utils/tauri-driver.util';
import {HttpStatus} from './http-status';
import {ErrorHandlerAPI} from "./error-handler.api";


export class TauriDriverAPI {
  public static async start(req: Request, res: Response): Promise<any> {
    try {
      TauriDriverUtility.start();
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async stop(req: Request, res: Response): Promise<any> {
    try {
      TauriDriverUtility.stop();
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }
}
