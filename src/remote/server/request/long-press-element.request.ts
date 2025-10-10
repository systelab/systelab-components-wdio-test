import {BasicElementRequest} from "./basic-element.request";

export interface LongPressElementRequest extends BasicElementRequest {
    duration?: number;
}
