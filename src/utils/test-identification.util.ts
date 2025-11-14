import { ReportUtility } from "./report.util.js";
import { Browser } from "../wdio/browser.js";

export class TestIdentification
{
    private static appVersion: string;

    public static setTmsLink(tmsLink: string): void {
        ReportUtility.addLabel("tms", tmsLink);
        ReportUtility.addLink("https://www.jamasoftware.com/", tmsLink, "tms");
    }

    public static setDescription(description: string): void {
        ReportUtility.setDescription(description);
    }

    public static setFeature(feature: string): void {
        ReportUtility.setFeature(feature);
    }

    public static setAppVersion(appVersion: string): void {
        this.appVersion = appVersion;
    }

    public static async captureEnvironment(): Promise<void> {
        ReportUtility.addLabel("OS", await Browser.getOperatingSystem());
        ReportUtility.addLabel("testExecutionDateTime", new Date().toLocaleString());
        ReportUtility.addLabel("browser", await Browser.getName());
        ReportUtility.addLabel("browserVersion", await Browser.getVersion());
        ReportUtility.addLabel("appVersion", this.appVersion);
    }
}
