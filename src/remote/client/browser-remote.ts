import { AutomationEnvironment, RemoteApplication } from "../../wdio";

export class BrowserRemote {

    // Navigation
    public static async navigateToURL(url: string): Promise<void> {
        const remoteApplication: RemoteApplication = AutomationEnvironment.getWorkingRemoteApplication();
        // Call endpoint
    }


    // Keyboard
    public static async pressEsc(): Promise<void> {
        // TODO
    }

    public static async pressTab(): Promise<void> {
        // TODO
    }

    public static async pressBackspace(): Promise<void> {
        // TODO
    }

    public static async pressEnter(): Promise<void> {
        // TODO
    }

    public static async pressDelete(): Promise<void> {
        // TODO
    }
    
    public static async writeText(stringToWrite: string): Promise<void> {
        // TODO
    }
    

    // Flow control
    public static async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number): Promise<void> {
        // TODO
    }


    // Screenshots
    public static async takeScreenshot(): Promise<string> {
        // TODO
        return '';
    }

    public static async saveScreenshot(filepath: string): Promise<void> {
        // TODO
    }


    // Capabilities and Status
    public static async getName(): Promise<string> {
        // TODO
        return '';
    }

    public static async getVersion(): Promise<string> {
        // TODO
        return '';
    }

    public static async getOperatingSystem(): Promise<string> {
        // TODO
        return '';
    }


    // Window
    public static async getWindowSize(): Promise<{ width: number, height: number }> {
        // TODO
        return { width: 0, height: 0 };
    }

    public static async setWindowSize(width: number, height: number): Promise<void> {
        // TODO
    }

    public static async setFullscreen(): Promise<void> {
        // TODO
    }
}
