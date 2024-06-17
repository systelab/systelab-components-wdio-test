
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
    private static browserType: BrowserType = BrowserType.Chrome;

    public static getMode(): AutomationMode {
        return this.mode;
    }

    public static setTestRunnerMode(): void {
        this.mode = AutomationMode.Runner;
    }

    public static setStandaloneMode(): void {
        this.mode = AutomationMode.Standalone;
    }

    public static getBrowserType(): BrowserType {
        return this.browserType;
    }

    public static setBrowserType(browserType: BrowserType): void {
        this.browserType = browserType;
    }
}
