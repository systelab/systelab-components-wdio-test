import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

import { BasicElementRequest } from '../request/basic-element.request';
import { ApplicationStartRequest } from '../request/application-start.request';


interface LoadedSchema {
    filename: string;
    validateFn: any;
}

export class JSONSchemaValidator {
    private static ajv = new Ajv();
    private static loadedSchemas: LoadedSchema[] = [];

    public static validateApplicationStartRequest(data: unknown): ApplicationStartRequest {
        this.validateData(data, 'application-start-request-schema.json');
        return data as ApplicationStartRequest;
    }

    public static validateBasicElementRequest(data: unknown): BasicElementRequest {
        this.validateData(data, 'basic-element-request-schema.json');
        return data as BasicElementRequest;
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

        const schemaPath = path.resolve(__dirname, filename);
        const schemaFile: string = fs.readFileSync(schemaPath, 'utf-8');
        const schemaObject: any = JSON.parse(schemaFile);
        const compiledSchema = this.ajv.compile(schemaObject);
        const newLoadedSchema: LoadedSchema = { filename, validateFn: compiledSchema };
        this.loadedSchemas.push(newLoadedSchema);

        return newLoadedSchema;
    }
}
