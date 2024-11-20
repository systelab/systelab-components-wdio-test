import { remote, RemoteOptions } from "webdriverio";
import { BrowserType } from "./automation-environment.js";


export interface Application {
    id: number;
    browserType: BrowserType;
    options: RemoteOptions;
    browser: WebdriverIO.Browser;
}

export class ApplicationManager {
    private static nextId = 1;
    private static applications: Application[] = [];

    public static async start(browserType: BrowserType, options: RemoteOptions): Promise<Application> {
        const id = this.nextId;
        this.nextId += 1;
        const browser = await remote(options);
        const application: Application = { id, browserType, options, browser };

        this.applications.push(application);
        return application;
    }

    public static async stop(id: number): Promise<void> {
        const app = this.get(id);
        if (app) {
            await app.browser.deleteSession();
            this.applications = this.applications.filter(app => app.id !== id);
        } else {
            throw new Error(`Application with id ${id} not found`);
        }
    }

    public static get(id: number): Application | undefined {
        return this.applications.find(app => app.id === id);
    }
}
