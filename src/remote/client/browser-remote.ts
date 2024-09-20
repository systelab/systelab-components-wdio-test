import { AutomationEnvironment, RemoteApplication } from "../../wdio";
import { HttpStatus } from "../server/http-status";

export class BrowserRemote {

    // Navigation
    public static async navigateToURL(url: string): Promise<void> {
        await this.executeEndpoint('POST', 'navigate', { url });
    }


    // Keyboard
    public static async pressEsc(): Promise<void> {
        await this.executeEndpoint('POST', 'keyboard/escape');
    }

    public static async pressTab(): Promise<void> {
        await this.executeEndpoint('POST', 'keyboard/tab');
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


    // Auxiliary methods
    private static async executeEndpoint(method: string, route: string, body: object = {}): Promise<any> {
        const remoteApplication: RemoteApplication = AutomationEnvironment.getWorkingRemoteApplication();
        const host = remoteApplication.host;
        const port = remoteApplication.port;
        const apiPrefix = remoteApplication.apiPrefix;
        const applicationId = remoteApplication.applicationId;
        const baseURL = `http://${host}:${port}/${apiPrefix}/applications/${applicationId}`;
        const endpointURL = `${baseURL}/${route}`;

        const response: Response = await fetch(endpointURL, {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            const errorMessage: string = (response.body as any).error as string;
            throw new Error('Error: ' + errorMessage);
        }

        return response.body;
    }

}
