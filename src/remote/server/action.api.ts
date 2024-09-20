import { Request, Response } from 'express';
import { AutomationEnvironment, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';
import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { WriteRequest } from './request/write.request';


export class ActionAPI {
    public static async click(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.click();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async moveTo(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.moveTo();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async clear(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.clear();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async write(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: WriteRequest = JSONSchemaValidator.validateWriteRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.write(requestBody.text);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async tap(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.tap();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

}
