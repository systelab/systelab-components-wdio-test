import { Request, Response } from 'express';
import { TauriDriverUtility } from '../../utils/tauri-driver.util';
import { HttpStatus } from './http-status';


export class TauriDriverAPI {
    public static async start(req: Request, res: Response): Promise<any> {
        try {
            TauriDriverUtility.start();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }
    
    public static async stop(req: Request, res: Response): Promise<any> {
        try {
            TauriDriverUtility.stop();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err});
        }
    }
}
