import {RemoteOptions} from "webdriverio";
import {BrowserType, RemoteApplication, RemoteHostData} from "../../wdio";
import {HttpStatus} from "../server/http-status";


export class ApplicationRemoteClient {

  public static async start(host: RemoteHostData, browserType: BrowserType, options: RemoteOptions): Promise<number> {
    const response = await this.executeEndpoint(host, 'start', {browserType, options});
    const body = await response.json();
    return body.id;
  }

  public static async stop(application: RemoteApplication): Promise<void> {
    await this.executeEndpoint(application.host, `${application.remoteId}/stop`);
  }


  // Auxiliary methods
  private static async executeEndpoint(remoteHost: RemoteHostData, route: string, body: object = {}): Promise<any> {
    const host = remoteHost.name;
    const port = remoteHost.port;
    const apiPrefix = remoteHost.apiPrefix;
    const baseURL = `http://${host}:${port}/${apiPrefix}/applications`;
    const endpointURL = `${baseURL}/${route}`;

    const response: Response = await fetch(endpointURL, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body),
    });

    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR || response.status == HttpStatus.NOT_FOUND) {
      const errorMessage: string = (response.body as any).error as string;
      throw new Error('Error: ' + errorMessage);
    }

    return response;
  }
}
