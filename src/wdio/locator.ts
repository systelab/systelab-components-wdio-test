
export enum LocatorType {
    ElementSelector,
    ArraySelector,
    ArrayItem
}

export interface Locator {
    type: LocatorType;
    selector?: string;
    index?: number;
}

