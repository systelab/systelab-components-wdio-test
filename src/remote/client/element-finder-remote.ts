import { Locator, RemoteApplication } from "../../wdio";
import { HttpStatus } from "../server/http-status";


export class ElementFinderRemote {
    constructor(protected remoteApplication: RemoteApplication, protected locators: Locator[]) {
    }

    public getLocators(): Locator[] {
        return this.locators;
    }


    // Queries
    public async isPresent(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async isDisplayed(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async isClickable(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async isEnabled(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async isSelected(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async isFocused(): Promise<boolean> {
        // TODO
        return false; 
    }

    public async getText(): Promise<string> {
        const response = await this.executeEndpoint('GET', 'element/text', { locators: this.locators });
        return response.text;
    }

    public async getValue(): Promise<string> {
        // TODO
        return ''; 
    }

    public async getHTML(includeSelectorTag: boolean): Promise<string> {
        // TODO
        return ''; 
    }

    public async getAttribute(name: string): Promise<string> {
        // TODO
        return ''; 
    }

    public async getCSSProperty(name: string): Promise<string> {
        const response = await this.executeEndpoint('GET', 'element/css-property', { locators: this.locators, name });
        return response.property;
    }

    public async getProperty(name: string): Promise<any> {
        // TODO
        return ''; 
    }

    public async getBoundingRect(): Promise<{ x: number, y: number, width: number, height: number }> {
        // TODO
        return { x: 0, y: 0, width: 0, height: 0 }; 
    }

    public async getPosition(): Promise<{ x: number, y: number }> {
        // TODO
        return { x: 0, y: 0 }; 
    }

    public async getSize(): Promise<{ width: number, height: number }> {
        // TODO
        return { width: 0, height: 0 };
    }


    // Actions
    public async click(): Promise<void> {
        await this.executeEndpoint('GET', 'element/click', { locators: this.locators });
    }

    public async moveTo(): Promise<void> {
         // TODO
    }

    public async clear(): Promise<void> {
        // TODO
    }

    public async write(text: string): Promise<void> {
        // TODO
    }

    public async tap(): Promise<void> {
        // TODO
    }


    // Condition waits
    public async waitToBePresent(timeout: number = 500): Promise<void> {
        // TODO
    }

    public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
        // TODO
    }

    public async waitToBeClickable(timeout: number = 500): Promise<void> {
        // TODO
    }

    public async waitToBeEnabled(timeout: number = 500): Promise<void> {
        // TODO
    }

    public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
        // TODO
    }


    // Screenshots
    public async takeScreenshot(): Promise<string> {
        // TODO
        return '';
    }

    public async saveScreenshot(filepath: string): Promise<void> {
        // TODO
    }


    // Count (for arrays)
    public async count(): Promise<number> {
        // TODO
        return 0;
    }

    // Auxiliary methods
    private async executeEndpoint(method: string, route: string, body: object): Promise<any> {
        const host = this.remoteApplication.host;
        const port = this.remoteApplication.port;
        const apiPrefix = this.remoteApplication.apiPrefix;
        const applicationId = this.remoteApplication.applicationId;
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
