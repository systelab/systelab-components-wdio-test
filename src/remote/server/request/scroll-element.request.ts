import {BasicElementRequest} from "./basic-element.request";

export interface ScrollElementRequest extends BasicElementRequest {
    options?: ScrollIntoViewOptions
}
