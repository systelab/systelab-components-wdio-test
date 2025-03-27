import {BasicElementRequest} from "./basic-element.request";
import {PseudoElement} from "../../../wdio";

export interface CSSPropertyElementRequest extends BasicElementRequest{
    name: string;
    pseudoElement?: PseudoElement;
}
