import { Request, Response } from 'express';
import { AutomationEnvironment, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';
import { HttpStatus } from './http-status';
import { ErrorHandlerAPI } from './error-handler.api';
import { WriteElementRequest } from './request/write-element.request';


export class ConditionWaitAPI {

    public static async untilCondition(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            // TODO: Figure out implementation
            // await element.waitUntil();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async untilElementPresent(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.waitToBePresent();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async untilElementDisplayed(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.waitToBeDisplayed();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async untilElementClickable(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.waitToBeClickable();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

    public static async untilElementEnabled(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.waitToBeEnabled();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return ErrorHandlerAPI.handle(res, err);
        }
    }

}
