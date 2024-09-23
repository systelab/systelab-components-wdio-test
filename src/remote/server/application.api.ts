import { Request, Response } from 'express';

import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { AutomationEnvironment, Application, ApplicationManager, Browser } from '../../wdio';
import { ApplicationStartRequest } from './request/application-start.request';
import { ApplicationNavigateRequest } from './request/application-navigate.request';
import { JSONSchemaValidator } from './schema/json-schema-validator';


export class ApplicationAPI {
   
    public static async start(req: Request, res: Response): Promise<any> {
        try {
            console.log("IN Create Application")
            const requestBody: ApplicationStartRequest = JSONSchemaValidator.validateApplicationStartRequest(req.body);
            console.log(`request body ${requestBody}`)
            const application: Application = await ApplicationManager.start(requestBody.browserType, requestBody.options);
            return res.status(HttpStatus.CREATED).json({ id: application.id }).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async stop(req: Request, res: Response): Promise<any> {
        try {
            await ApplicationManager.stop(+req.params.id);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async navigate(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: ApplicationNavigateRequest = JSONSchemaValidator.validateApplicationNavigateRequest(req.body);
            await Browser.navigateToURL(requestBody.url);            
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async getName(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            return res.status(HttpStatus.OK).json(Browser.getName()).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }

    public static async getVersion(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            return res.status(HttpStatus.OK).json(Browser.getVersion()).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }

    public static async getOperatingSystem(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            return res.status(HttpStatus.OK).json(Browser.getOperatingSystem()).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }
}
