import {Readable, Writable} from "node:stream";
import {ChildProcessByStdio} from "child_process";

import os from "os";
import path from "path";
import {spawn} from "child_process";


export class TauriDriverUtility {

    private static tauriDriver: ChildProcessByStdio<Writable, Readable, null> | null;
  
    public static start(): void {
      if (!this.tauriDriver) {
        // @ts-ignore
        this.tauriDriver = spawn(path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'), [], {
          stdio: [null, process.stdout, process.stderr],
          cwd: 'bin/'
        });
      }
    }
  
    public static stop(): void {
      if (this.tauriDriver) {
        this.tauriDriver.kill();
        this.tauriDriver = null
      }
    }
  
  }
