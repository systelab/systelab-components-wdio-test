import type { Capabilities } from "@wdio/types";
import { BrowserType } from "../../../wdio";


export interface ApplicationStartRequest {
    browserType: BrowserType;
    options: Capabilities.WebdriverIOConfig;
}
