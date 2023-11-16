import allureReporter from '@wdio/allure-reporter'
import {Status} from "allure-js-commons";


export class ReportUtility {

    public static setDescription(description: string): void {
        allureReporter.addDescription(description, "text");
    }

    public static setFeature(feature: string): void {
        allureReporter.addFeature(feature);
    }

    public static addLabel(label: string, value: string): void {
        allureReporter.addLabel(label, value);
   }

    public static async addExpectedResult(description: string, expectationFunction: () => Promise<void>): Promise<void> {
        const testCaseReporter = ((browser.options as any).testCaseReporter);
        try {
            if (testCaseReporter) {
                testCaseReporter.onAssertStart(description);
            }

            allureReporter.startStep(description);
            await expectationFunction();
            allureReporter.endStep(Status.PASSED);

            if (testCaseReporter) {
                testCaseReporter.onAssertEnd(description);
            }
        }
        catch (error) {
            allureReporter.endStep(Status.FAILED);
            if (testCaseReporter) {
                testCaseReporter.onAssertEnd(description, true);
            }

            throw (error);
        }
    }
}
