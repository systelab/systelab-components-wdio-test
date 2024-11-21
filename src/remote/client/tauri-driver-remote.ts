import {RemoteHostData} from '../../wdio/index.js';
import {HttpStatus} from '../server/http-status.js';


export class TauriDriverRemote {

  public static async start(remoteHost: RemoteHostData): Promise<void> {
    await this.executeEndpoint(remoteHost,'POST', 'start');
  }

  public static async stop(remoteHost: RemoteHostData): Promise<void> {
    await this.executeEndpoint( remoteHost, 'POST', 'stop');
  }

  // Auxiliary methods
  private static async executeEndpoint(remoteHost: RemoteHostData,method: string, route: string): Promise<any> {

    const hostname = remoteHost.name;
    const port = remoteHost.port;
    const apiPrefix = remoteHost.apiPrefix;
    const baseURL = `http://${hostname}:${port}/${apiPrefix}`;
    const endpointURL = `${baseURL}/${route}`;

    const response: Response = await fetch(endpointURL, {
      method,
      headers: {'content-type': 'application/json'},
    });

    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorMessage: string = (response.body as any).error as string;
      throw new Error('Error: ' + errorMessage);
    }

    return response;
  }
}


