
export enum AutomationMode {
    Runner,
    Standalone
}

export enum BrowserType {
    Chrome,
    Edge,
    Firefox,
    Safari,
    WebKitGTK,
    TauriApp
}

export class AutomationEnvironment {
    private static mode: AutomationMode = AutomationMode.Runner;
    private static workingBrowser: WebdriverIO.Browser | null = null;
    private static browserType: BrowserType = BrowserType.Chrome;

    public static getMode(): AutomationMode {
        return this.mode;
    }

    public static getWorkingBrowser(): WebdriverIO.Browser {
        if (this.workingBrowser) {
            return this.workingBrowser;
        }
        else {
            return browser;
        }
    }

    public static setTestRunnerMode(): void {
        this.mode = AutomationMode.Runner;
        this.workingBrowser = null; // Browser instance will be managed by test runner
    }

    public static setStandaloneMode(workingBrowser: WebdriverIO.Browser): void {
        this.mode = AutomationMode.Standalone;
        this.workingBrowser = workingBrowser;
    }

    public static getBrowserType(): BrowserType {
        return this.browserType;
    }

    public static setBrowserType(browserType: BrowserType): void {
        this.browserType = browserType;
    }
}
