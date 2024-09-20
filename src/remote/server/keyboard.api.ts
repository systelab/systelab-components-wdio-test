import { Request, Response } from 'express';

import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { AutomationEnvironment, ApplicationManager, Browser, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { ApplicationWriteTextRequest } from './request/application-write-text.request';


export class KeyboardAPI {
    
    public static async pressEscape(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.pressEsc();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async pressTab(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.pressTab();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async pressBackspace(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.pressBackspace();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async pressEnter(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.pressEnter();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async pressDelete(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.pressDelete();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async writeText(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);   
            const requestBody: ApplicationWriteTextRequest = JSONSchemaValidator.validateApplicationWriteTextRequest(req.body);    
            await Browser.writeText(requestBody.stringToWrite);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

  
}
