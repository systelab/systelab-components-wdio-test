import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

import {BasicElementRequest} from '../request/basic-element.request';
import {ApplicationStartRequest} from '../request/application-start.request';
import {ApplicationNavigateRequest} from '../request/application-navigate.request';
import {WindowSizeRequest} from '../request/window-size.request';
import {ApplicationWriteTextRequest} from '../request/application-write-text.request';
import {HTMLRequest} from '../request/html.request';
import {PropertyElementRequest} from '../request/property-element.request';
import {WriteElementRequest} from '../request/write-element.request';
import {CSSPropertyElementRequest} from "../request/css-property-element-request";
import {ScrollElementRequest} from "../request/scroll-element.request";


interface LoadedSchema {
    filename: string;
    validateFn: any;
}

export class JSONSchemaValidator {
    private static ajv = new Ajv();
    private static loadedSchemas: LoadedSchema[] = [];
    private static __dirname: string = __dirname;

    public static validateApplicationStartRequest(data: unknown): ApplicationStartRequest {
        this.validateData(data, 'application-start-request-schema.json');
        return data as ApplicationStartRequest;
    }

    public static validateApplicationNavigateRequest(data: unknown): ApplicationNavigateRequest {
        this.validateData(data, 'application-navigate-request-schema.json');
        return data as ApplicationNavigateRequest;
    }

    public static validateBasicElementRequest(data: unknown): BasicElementRequest {
        this.validateData(data, 'basic-element-request-schema.json');
        return data as BasicElementRequest;
    }

    public static validateWindowSizeRequest(data: unknown): WindowSizeRequest {
        this.validateData(data, 'window-size-request-schema.json');
        return data as WindowSizeRequest;
    }

    public static validateApplicationWriteTextRequest(data: unknown): ApplicationWriteTextRequest {
        this.validateData(data, 'application-write-text-request-schema.json');
        return data as ApplicationWriteTextRequest;
    }

    public static validateHTMLRequest(data: unknown): HTMLRequest {
        this.validateData(data, 'html-request-schema.json');
        return data as HTMLRequest;
    }

    public static validateCSSPropertyRequest(data: unknown): CSSPropertyElementRequest {
        this.validateData(data, 'css-property-element-request-schema.json');
        return data as CSSPropertyElementRequest;
    }

    public static validatePropertyRequest(data: unknown): PropertyElementRequest {
        this.validateData(data, 'property-element-request-schema.json');
        return data as PropertyElementRequest;
    }

    public static validateWriteRequest(data: unknown): WriteElementRequest {
        this.validateData(data, 'write-element-request-schema.json');
        return data as WriteElementRequest;
    }

    public static validateScrollRequest(data: unknown): ScrollElementRequest {
        this.validateData(data, 'scroll-element-request-schema.json');
        return data as ScrollElementRequest;
    }

    private static validateData(data: unknown, schemaFilename: string): void {
        const schema: LoadedSchema = this.loadSchema(schemaFilename);
        const validData: boolean = schema.validateFn(data);
        if (!validData) {
            throw new Error(`Data does not fulfill JSON schema '${schemaFilename}':` + JSON.stringify(schema.validateFn.errors));
        }
    }

    private static loadSchema(filename: string): LoadedSchema {
        const loadedSchema = this.loadedSchemas.find((schema) => schema.filename === filename);
        if (loadedSchema) {
            return loadedSchema;
        }

        const schemaPath = path.resolve(this.__dirname, filename);
        const schemaFile: string = fs.readFileSync(schemaPath, 'utf-8');
        const schemaObject: any = JSON.parse(schemaFile);
        const compiledSchema = this.ajv.compile(schemaObject);
        const newLoadedSchema: LoadedSchema = { filename, validateFn: compiledSchema };
        this.loadedSchemas.push(newLoadedSchema);

        return newLoadedSchema;
    }
}
