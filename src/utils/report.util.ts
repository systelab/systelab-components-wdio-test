import allureReporter from '@wdio/allure-reporter';
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

    public static addLink(url: string, name: string, type: string): void {
        allureReporter.addLink(url, name, type);
    }

    public static async addExpectedResult(description: string, expectationFunction: () => Promise<void>): Promise<void> {
        const testCaseReporter = ((jasmine.getEnv() as any).testCaseReporter);
        try {
            if (testCaseReporter) {
                testCaseReporter.onAssertStart(description);
            }
            
            allureReporter.startStep(description);
            
            const initialFailedCount = (jasmine.getEnv() as any).currentJasmineSpec?.failedExpectations?.length || 0;
            
            await expectationFunction();
            
            const finalFailedCount = (jasmine.getEnv() as any).currentJasmineSpec?.failedExpectations?.length || 0;
            const hasNewFailures = finalFailedCount > initialFailedCount;

            if (hasNewFailures) {
                allureReporter.endStep(Status.FAILED);
                
                if (testCaseReporter) {
                    testCaseReporter.onAssertEnd(description, true);
                }
    
            } else {
                allureReporter.endStep(Status.PASSED);
                
                if (testCaseReporter) {
                    testCaseReporter.onAssertEnd(description, false);
                }
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
