import { Request, Response } from 'express';
import { AutomationEnvironment, ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';
import { HttpStatus } from './http-status';


export class QueryAPI {
    public static async getText(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            const text: string = await element.getText();
            return res.status(HttpStatus.OK).json({ text }).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }

    public static async getValue(req: Request, res: Response): Promise<any> {
        try {
            AutomationEnvironment.setApplication(+req.params.id);
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            const value: string = await element.getValue();
            return res.status(HttpStatus.OK).json({ value }).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }
}
