import { RemoteOptions } from "webdriverio";
import { BrowserType } from "../../../wdio";


export interface ApplicationStartRequest {
    browserType: BrowserType;
    options: RemoteOptions;
}
