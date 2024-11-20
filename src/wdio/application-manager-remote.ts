import { RemoteOptions } from "webdriverio";
import { BrowserType } from "./automation-environment.js";
import { ApplicationRemoteClient } from "../remote/client/application-remote-client.js";


export interface RemoteApplication {
    id: number;
    host: RemoteHostData;
    remoteId: number;
}

export interface RemoteHostData {
    name: string;
    port: number;
    apiPrefix: string;
}

export class RemoteApplicationManager {
    private static nextId = 1;
    private static applications: RemoteApplication[] = [];

    public static async start(remoteHost: RemoteHostData, browserType: BrowserType, options: RemoteOptions): Promise<RemoteApplication> {
        const id = this.nextId;
        this.nextId += 1;
        const remoteId: number = await ApplicationRemoteClient.start(remoteHost, browserType, options);
        const application: RemoteApplication = { id, host: remoteHost, remoteId };

        this.applications.push(application);
        return application;
    }

    public static async stop(id: number): Promise<void> {
        const app = this.get(id);
        if (app) {
            await ApplicationRemoteClient.stop(app);
            this.applications = this.applications.filter(app => app.id !== id);
        } else {
            throw new Error(`Remote application with id ${id} not found`);
        }
    }

    public static get(id: number): RemoteApplication | undefined {
        return this.applications.find(app => app.id === id);
    }
}

