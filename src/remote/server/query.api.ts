import {Request, Response} from 'express';
import {AutomationEnvironment, ElementArrayFinder, ElementFinder, ElementFinderBuilder} from '../../wdio';
import {JSONSchemaValidator} from './schema/json-schema-validator';
import {BasicElementRequest} from './request/basic-element.request';
import {HttpStatus} from './http-status';
import {ErrorHandlerAPI} from './error-handler.api';
import {HTMLRequest} from './request/html.request';
import {PropertyElementRequest} from './request/property-element.request';


export class QueryAPI {

  public static async isPresent(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isPresent: boolean = await element.isPresent();
      return res.status(HttpStatus.OK).json({isPresent}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async isDisplayed(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isDisplayed: boolean = await element.isDisplayed();
      return res.status(HttpStatus.OK).json({isDisplayed}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async isClickable(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isClickable: boolean = await element.isClickable();
      return res.status(HttpStatus.OK).json({isDisplayed: isClickable}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async isEnabled(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isEnabled: boolean = await element.isEnabled();
      return res.status(HttpStatus.OK).json({isDisplayed: isEnabled}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async isSelected(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isSelected: boolean = await element.isSelected();
      return res.status(HttpStatus.OK).json({isDisplayed: isSelected}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async isFocused(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const isFocused: boolean = await element.isFocused();
      return res.status(HttpStatus.OK).json({isDisplayed: isFocused}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getText(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const text: string = await element.getText();
      return res.status(HttpStatus.OK).json({text}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getValue(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const value: string = await element.getValue();
      return res.status(HttpStatus.OK).json({value}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }


  public static async getHTML(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: HTMLRequest = JSONSchemaValidator.validateHTMLRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const html: string = await element.getHTML(requestBody.includeSelectorTag);
      return res.status(HttpStatus.OK).json({html}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getAttribute(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: PropertyElementRequest = JSONSchemaValidator.validatePropertyRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const attribute: string = await element.getAttribute(requestBody.name);
      return res.status(HttpStatus.OK).json({attribute}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getCSSProperty(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: PropertyElementRequest = JSONSchemaValidator.validatePropertyRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const property: string = await element.getCSSProperty(requestBody.name);
      return res.status(HttpStatus.OK).json({property}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getProperty(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: PropertyElementRequest = JSONSchemaValidator.validatePropertyRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const property: string = await element.getProperty(requestBody.name);
      return res.status(HttpStatus.OK).json({property}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getBoundingRect(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const boundingRect: { x: number, y: number, width: number, height: number } = await element.getBoundingRect();
      return res.status(HttpStatus.OK).json({boundingRect}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async getPosition(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const position: { x: number, y: number } = await element.getPosition();
      return res.status(HttpStatus.OK).json({position}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }


  public static async getSize(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const element: ElementFinder = ElementFinderBuilder.build(requestBody.locators) as ElementFinder;
      const size: { width: number, height: number } = await element.getSize();
      return res.status(HttpStatus.OK).json({size}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }

  public static async count(req: Request, res: Response): Promise<any> {
    try {
      AutomationEnvironment.setApplication(+req.params.id);
      const requestBody: BasicElementRequest = JSONSchemaValidator.validateBasicElementRequest(req.body);
      const elementArray: ElementArrayFinder = ElementFinderBuilder.build(requestBody.locators) as ElementArrayFinder;
      const count: number = await elementArray.count();
      return res.status(HttpStatus.OK).json({count}).send();
    } catch (err) {
      return ErrorHandlerAPI.handle(res, err);
    }
  }
}
