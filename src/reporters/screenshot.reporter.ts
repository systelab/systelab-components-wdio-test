import * as fs from 'fs';
import {AutomationEnvironment} from "../wdio/index.js";

export class ScreenshotReporter {
    private static basePath = "./reports/screenshots";
    private static specCount = 0;

    public static setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    public static beforeSuite(suite: any): void {
        this.specCount = 0;
    }

    public static async afterTest(test: { description: string, fullName: string },
                                  context: any = null,
                                  status: { error: any, result: any, duration: any, passed: any, retries: any } | null = null): Promise<void> {
        this.specCount++;
        const suiteName = test.fullName.slice(0, -1 * (test.description.length)).trim();
        try {
            const screenshotFolderPath = `${this.basePath}/${suiteName}`;
            if (!fs.existsSync(screenshotFolderPath)){
                fs.mkdirSync(screenshotFolderPath, { recursive: true });
            }
            const screenshotFilename = `${this.specCount.toString().padStart(2, "0")}-${test.description}`;
            const screenshotFilenameClean = this.getSanitizedFilename(screenshotFilename);
            const screenshotFilepath = `${screenshotFolderPath}/${screenshotFilenameClean}.png`;
            if (AutomationEnvironment.hasWorkingBrowser()) {
                await AutomationEnvironment.getWorkingBrowser().saveScreenshot(screenshotFilepath);
            } else {
                fs.writeFileSync(screenshotFilepath.replace('.png', '-[no-working-browser].png'), '');
            }
        } catch(e) {
            console.log(e);
        }
    }

    private static getSanitizedFilename(filename: string): string {
        return filename
            .replace(/[\/\\\:]/g, " ")
            .replace(/\"/g, "'")
            .replace(/\</g, "(")
            .replace(/\>/g, ")")
            .replace(/[\*\?\|]/g, "")
            .replace(/\n|\r/g, "")
            .substring(0, 300).trim();
    }
}
