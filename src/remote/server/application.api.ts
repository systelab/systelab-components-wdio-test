import { Request, Response } from 'express';
import { Application, ApplicationManager } from '../../wdio/application-manager';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { ApplicationStartRequest } from './request/application-start.request';
import { HttpStatus } from './http-status';


export class ApplicationAPI {
    public static async start(req: Request, res: Response): Promise<any> {
        try {
            const requestBody: ApplicationStartRequest = JSONSchemaValidator.validateApplicationStartRequest(req.body);
            const application: Application = await ApplicationManager.start(requestBody.browserType, requestBody.options);
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

    public static async navigate(req: Request, res: Response): Promise<any> {
        // TODO: Implement
        return null;
    }
}
