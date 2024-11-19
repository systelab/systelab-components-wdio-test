import { Request, Response } from 'express';

import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { AutomationEnvironment, Browser, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';


export class ScreenshotAPI {
    
    public static async takeAll(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);      
            const screenshot = await Browser.takeScreenshot();
            return res.status(HttpStatus.OK).json({screenshot}).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async takeElement(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            const screenshot = await element.takeScreenshot();
            return res.status(HttpStatus.OK).json({screenshot}).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }  
}
