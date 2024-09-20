import { RemoteOptions } from "webdriverio";
import { BrowserType, RemoteApplication } from "../../wdio";
import { RemoteHost } from "./tauri-driver-remote";
import { HttpStatus } from "../server/http-status";


export class ApplicationRemoteClient {

    public static async start(host: RemoteHost, browserType: BrowserType, options: RemoteOptions): Promise<number> {
        const response = await this.executeEndpoint(host, 'start', { browserType, options });
        return response.id;
    }

    public static async stop(application: RemoteApplication): Promise<void> {
        const host = { hostname: application.host, port: application.port, apiPrefix: application.apiPrefix };
        await this.executeEndpoint(host, `${application.applicationId}/stop`);
    }


    // Auxiliary methods
    private static async executeEndpoint(remoteHost: RemoteHost, route: string, body: object = {}): Promise<any> {
        const host = remoteHost.hostname;
        const port = remoteHost.port;
        const apiPrefix = remoteHost.apiPrefix;
        const baseURL = `http://${host}:${port}/${apiPrefix}/applications/${route}`;
        const endpointURL = `${baseURL}/${route}`;

        const response: Response = await fetch(endpointURL, {
            method: 'POST',
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