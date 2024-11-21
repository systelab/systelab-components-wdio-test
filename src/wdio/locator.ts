
export enum LocatorType {
    ElementSelector = 'ElementSelector',
    ArraySelector = 'ArraySelector',
    ArrayItem = 'ArrayItem',
}

export interface Locator {
    type: LocatorType;
    selector?: string;
    index?: number;
}

