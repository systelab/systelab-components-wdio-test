import { Request, Response } from 'express';
import { ElementFinder, ElementFinderBuilder } from '../../wdio';
import { JSONSchemaValidator } from './schema/json-schema-validator';
import { BasicElementRequest } from './request/basic-element.request';


export class ActionAPI {
    public static async click(req: Request, res: Response): Promise<any> {
        try {
            const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
            const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
            await element.click();
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": err}).send();
        }
    }
}
