import { Request, Response } from 'express';

import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { AutomationEnvironment, ApplicationManager, Browser, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { ApplicationNavigateRequest } from './request/application-navigate.request';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';
import { WindowSizeRequest } from './request/window-size.request';


export class WindowAPI {
    
    public static async getSize(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            return res.status(HttpStatus.OK).json(await Browser.getWindowSize()).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async setSize(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);     
            const requestBody: WindowSizeRequest = JSONSchemaValidator.validateWindowSizeRequest(req.body); 
            await Browser.setWindowSize(requestBody.width,requestBody.height);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async setFullscreen(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            await Browser.setFullscreen();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

  
}
