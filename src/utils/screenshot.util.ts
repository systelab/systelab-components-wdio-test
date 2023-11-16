import {PNG, PNGWithMetadata} from 'pngjs';
import * as fs from 'fs';
import Pixelmatch from 'pixelmatch';

import {ElementFinder} from "../wdio";
import {ReportUtility} from "./report.util.js";
import {AssertionUtility} from "./assertion.util.js";
import {Widget} from "../widgets";
import {BasePage} from "../pages";


export class ScreenshotUtility {
    private static basePath = './screenshots';
    private static pixelTolerance = 0;
    private static imageMatchingThreshold = 0.1;

    public static setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    public static setPixelTolerance(pixelTolerance: number): void {
        this.pixelTolerance = pixelTolerance;
    }

    public static setImageMatchingThreshold(imageMatchingThreshold: number): void {
        this.imageMatchingThreshold = imageMatchingThreshold;
    }

    public static async expectPageScreenshot(page: BasePage, fileName: string, pageDescriptiveName: string): Promise<void> {
        return this.expectScreenshot(page.getElementFinder(), fileName, pageDescriptiveName);
    }

    public static async expectWidgetScreenshot(widget: Widget, fileName: string, widgetDescriptiveName: string): Promise<void> {
        return this.expectScreenshot(widget.getElement(), fileName, widgetDescriptiveName);
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
        const expectedImage: PNGWithMetadata = PNG.sync.read(fs.readFileSync(expectedImageFilepath));
        const actualImage: PNGWithMetadata = PNG.sync.read(fs.readFileSync(actualImageFilepath));

        const { width, height } = expectedImage;
        const diffImage = new PNG({width, height});
        const numDiffPixels = Pixelmatch(expectedImage.data, actualImage.data, diffImage.data, width, height, {threshold: this.imageMatchingThreshold});

        fs.writeFileSync(diffImageFilepath, PNG.sync.write(diffImage));

        return numDiffPixels;
    }
}
