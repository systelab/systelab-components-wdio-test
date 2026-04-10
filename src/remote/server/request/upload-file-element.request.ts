import { BasicElementRequest } from "./basic-element.request";

export interface UploadFileElementRequest extends BasicElementRequest {
    name: string;
    content: string;
}

