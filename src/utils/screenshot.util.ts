import {ElementFinder} from "../wdio";
import {ReportUtility} from "./report.util";
import {readPngFileSync, writePngFileSync} from 'node-libpng';
import {diffImages} from 'native-image-diff';
import {AssertionUtility} from "./assertion.util";

export class ScreenshotUtility {

    public static async expectScreenshot(element: ElementFinder, screenshotPath: string, fileName: string, elementDescriptiveName: string, pixelTolerance: number = 0): Promise<void> {
        const actualImageFilepath = `${screenshotPath}${fileName}-actual.png`;
        await element.saveScreenshot(actualImageFilepath);

        const expectedImageFilepath = `${screenshotPath}${fileName}-expected.png`;
        await ReportUtility.addExpectedResult(`'${elementDescriptiveName}' is equal to screenshot of '${fileName}-expected.png' file`, async () => {
            const diffImageFilepath = `${screenshotPath}${fileName}-diff.png`;
            const diffPixels = this.compareImageFiles(expectedImageFilepath, actualImageFilepath, diffImageFilepath);
            AssertionUtility.expectLowerOrEqual(diffPixels, pixelTolerance);
        });
    }

    private static compareImageFiles(expectedImageFilepath: string, actualImageFilepath: string, diffImageFilepath: string): number {
        const expectedImage = readPngFileSync(expectedImageFilepath);
        const actualImage = readPngFileSync(actualImageFilepath);

        const { image, pixels } = diffImages(expectedImage, actualImage);
        // @ts-ignore
        writePngFileSync(diffImageFilepath, image.data, { width: image.width, height: image.height });

        return pixels;
    }
}
