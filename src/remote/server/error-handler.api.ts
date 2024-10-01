
import { Response } from 'express';
import { HttpStatus } from './http-status';

export class ErrorHandlerAPI {
    public static handle(res: Response, err: any): any {
        let errorMessage;
        if (err instanceof Error) {
            errorMessage = err.message;
        } else {
            errorMessage = err;
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"error": errorMessage}).send();
    }
}