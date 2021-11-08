import { ChainablePromiseArray, ChainablePromiseElement } from "webdriverio";

export type WebDriverIOElement = WebdriverIO.Element | ChainablePromiseElement<Promise<WebdriverIO.Element>>;
export type WebDriverIOElementArray = WebdriverIO.ElementArray | ChainablePromiseArray<WebdriverIO.ElementArray>;

