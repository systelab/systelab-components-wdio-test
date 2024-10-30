import { ReportUtility } from "./report.util.js";
import { Browser } from "../wdio/browser.js";

export class TestIdentification
{
    private static appVersion: string;

    public static setTmsLink(tmsLink: string): void {
        ReportUtility.addLabel("tms", tmsLink);
    }

    public static setDescription(description: string): void {
        ReportUtility.setDescription(description);
        ReportUtility.setFeature(description);
    }

    public static setAppVersion(appVersion: string): void {
        this.appVersion = appVersion;
    }

    public static captureEnvironment(): void {
        ReportUtility.addLabel("OS", Browser.getOperatingSystem());
        ReportUtility.addLabel("testExecutionDateTime", new Date().toLocaleString());
        ReportUtility.addLabel("browser", Browser.getName());
        ReportUtility.addLabel("browserVersion", Browser.getVersion());
        ReportUtility.addLabel("appVersion", this.appVersion);
    }
}
