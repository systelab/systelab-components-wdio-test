import { Application, ApplicationManager } from './application-manager';


export enum AutomationMode {
    Runner,
    Standalone,
    Remote
}

export enum BrowserType {
    Chrome = 'Chrome',
    Edge = 'Edge',
    Firefox = 'Firefox',
    Safari = 'Safari',
    WebKitGTK = 'WebKitGTK',
    TauriApp = 'TauriApp'
}

export interface RemoteApplication {
    host: string;
    port: number;
    apiPrefix: string;
    applicationId: number;
}

export class AutomationEnvironment {
    private static mode: AutomationMode = AutomationMode.Runner;
    private static workingBrowser: WebdriverIO.Browser | null = null;
    private static browserType: BrowserType = BrowserType.Chrome;
    private static workingRemoteApplication: RemoteApplication | null = null;

    public static getMode(): AutomationMode {
        return this.mode;
    }

    public static isLocalMode(): boolean {
        return !this.isRemoteMode();
    }

    public static isRemoteMode(): boolean {
        return this.mode === AutomationMode.Remote;
    }

    public static hasWorkingBrowser(): boolean {
        if (this.mode === AutomationMode.Standalone) {
            return !!(this.workingBrowser);
        } else {
            return true;
        }
    }

    public static getWorkingBrowser(): WebdriverIO.Browser {
        if (this.mode === AutomationMode.Standalone) {
            if (this.workingBrowser) {
                return this.workingBrowser;
            } else {
                throw new Error('No working browser defined in WDIO standalone mode');
            }
        }
        else {
            return browser;
        }
    }

    public static setTestRunnerMode(): void {
        this.mode = AutomationMode.Runner;
        this.workingBrowser = null; // Browser instance will be managed by test runner
        this.workingRemoteApplication = null;
    }

    public static setStandaloneMode(workingBrowser: WebdriverIO.Browser | null): void {
        this.mode = AutomationMode.Standalone;
        this.workingBrowser = workingBrowser;
        this.workingRemoteApplication = null;
    }

    public static getBrowserType(): BrowserType {
        return this.browserType;
    }

    public static setBrowserType(browserType: BrowserType): void {
        this.browserType = browserType;
    }

    public static setApplication(applicationId: number): void {
        const application: Application = ApplicationManager.get(applicationId) as Application;
        if (application) {
            this.setBrowserType(application.browserType);
            this.setStandaloneMode(application.browser);
        } else {
            throw new Error(`Application with id ${applicationId} not found`);
        }
    }

    public static getWorkingRemoteApplication(): RemoteApplication {
        return this.workingRemoteApplication as RemoteApplication;
    }

    public static setRemoteApplication(remoteApplication: RemoteApplication): void {
        this.mode = AutomationMode.Remote;
        this.workingBrowser = null;
        this.workingRemoteApplication = remoteApplication;
    }
}
