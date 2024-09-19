import { Request, Response } from 'express';
import { Application, ApplicationManager } from '../../wdio/application-manager';

export class ApplicationAPI {
    public static async start(req: Request, res: Response): Promise<any> {
        try {
            const options = req.body;
            const application: Application = await ApplicationManager.start(options);
            return res.status(HttpStatus.CREATED).json(application.id).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }

    public static async stop(req: Request, res: Response): Promise<any> {
        try {
            const applicationId: number = +req.params.id;
            await ApplicationManager.stop(applicationId);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }
}
