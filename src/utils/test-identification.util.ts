import { ReportUtility } from "./report.util";


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
        ReportUtility.addLabel("OS", (browser.capabilities as any).platformName);
        ReportUtility.addLabel("testExecutionDateTime", new Date().toLocaleString());
        ReportUtility.addLabel("browser", (browser.capabilities as any).browserName);
        ReportUtility.addLabel("browserVersion", (browser.capabilities as any).browserVersion);
        ReportUtility.addLabel("appVersion", this.appVersion);
    }
}
