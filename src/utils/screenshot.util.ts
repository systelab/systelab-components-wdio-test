import {readPngFileSync, writePngFileSync} from 'node-libpng';
import {diffImages, DiffResult} from 'native-image-diff';

import {ElementFinder} from "../wdio";
import {ReportUtility} from "./report.util";
import {AssertionUtility} from "./assertion.util";


export class ScreenshotUtility {
    private static basePath = './screenshots';
    private static pixelTolerance = 0;

    public static setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    public static setPixelTolerance(pixelTolerance: number): void {
        this.pixelTolerance = pixelTolerance;
    }

    public static async expectScreenshot(element: ElementFinder, fileName: string, elementDescriptiveName: string): Promise<void> {
        const actualImageFilepath = `${this.basePath}/${fileName}.actual.png`;
        await element.saveScreenshot(actualImageFilepath);

        const expectedImageFilepath = `${this.basePath}/${fileName}.expected.png`;
        await ReportUtility.addExpectedResult(`'${elementDescriptiveName}' is equal to screenshot of '${fileName}.expected.png' file`, async () => {
            const diffImageFilepath = `${this.basePath}/${fileName}.diff.png`;
            const diffPixels = this.compareImageFiles(expectedImageFilepath, actualImageFilepath, diffImageFilepath);
            AssertionUtility.expectLowerOrEqual(diffPixels, this.pixelTolerance);
        });
    }

    private static compareImageFiles(expectedImageFilepath: string, actualImageFilepath: string, diffImageFilepath: string): number {
        const expectedImage = readPngFileSync(expectedImageFilepath);
        const actualImage = readPngFileSync(actualImageFilepath);

        const result: DiffResult = diffImages(expectedImage, actualImage);
        if (result.image) {
            writePngFileSync(diffImageFilepath, result.image.data, { width: result.image.width, height: result.image.height });
        }

        return result.pixels;
    }
}
