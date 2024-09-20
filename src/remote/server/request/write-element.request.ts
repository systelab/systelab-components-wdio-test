import { BasicElementRequest } from "./basic-element.request";

export interface WriteElementRequest extends BasicElementRequest{
    text: string;
}
