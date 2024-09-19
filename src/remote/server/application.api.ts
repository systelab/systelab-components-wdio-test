import { Request, Response } from 'express';
import { Application, ApplicationManager } from '../../wdio/application-manager';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { ApplicationStartRequest } from './request/application-start.request';
import { HttpStatus } from './http-status';
import { AutomationEnvironment } from '../../wdio/automation-environment';
import { ApplicationNavigateRequest } from './request/application-navigate.request';
import { Browser } from '../../wdio';


export class ApplicationAPI {
    public static async start(req: Request, res: Response): Promise<any> {
        try {
            const requestBody: ApplicationStartRequest = JSONSchemaValidator.validateApplicationStartRequest(req.body);
            const application: Application = await ApplicationManager.start(requestBody.browserType, requestBody.options);
            return res.status(HttpStatus.CREATED).json({ id: application.id }).send();
        } catch (err) {
            return this.handleError(res, err);
        }
    }

    public static async stop(req: Request, res: Response): Promise<any> {
        try {
            await ApplicationManager.stop(+req.params.id);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return this.handleError(res, err);
        }
    }

    public static async navigate(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: ApplicationNavigateRequest = JSONSchemaValidator.validateApplicationNavigateRequest(req.body);
            await Browser.navigateToURL(requestBody.url);            
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return this.handleError(res, err);
        }
    }

    private static handleError(res: Response, err: any): any {
        let errorMessage;
        if (err instanceof Error) {
            errorMessage = err.message;
        } else {
            errorMessage = err;
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": errorMessage}).send();
    }
}
