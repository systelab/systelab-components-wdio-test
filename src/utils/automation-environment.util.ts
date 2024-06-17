
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
    private static browser: any = null;
    private static browserType: BrowserType = BrowserType.Chrome;

    public static getMode(): AutomationMode {
        return this.mode;
    }

    public static getBrowser(): any {
        return this.browser;
    }

    public static setTestRunnerMode(): void {
        this.mode = AutomationMode.Runner;
        this.browser = null; // Browser instance will be managed by test runner
    }

    public static setStandaloneMode(browser: any): void {
        this.mode = AutomationMode.Standalone;
        this.browser = browser;
    }

    public static getBrowserType(): BrowserType {
        return this.browserType;
    }

    public static setBrowserType(browserType: BrowserType): void {
        this.browserType = browserType;
    }
}
