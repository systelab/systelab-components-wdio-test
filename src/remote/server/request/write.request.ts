import { BasicElementRequest } from "./basic-element.request";

export interface WriteRequest extends BasicElementRequest{
    text: string;
}
