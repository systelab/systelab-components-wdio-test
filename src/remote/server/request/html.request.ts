import { BasicElementRequest } from "./basic-element.request";

export interface HTMLRequest extends BasicElementRequest{
    includeSelectorTag: boolean;
}
