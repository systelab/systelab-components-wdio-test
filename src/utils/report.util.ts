import allureReporter from '@wdio/allure-reporter'


export class ReportUtility
{
    public static setDescription(description: string): void
    {
        allureReporter.addDescription(description, "text");
    }

    public static setFeature(feature: string): void
    {
        allureReporter.addFeature(feature);
    }

    public static addLabel(label: string, value: string): void
    {
        allureReporter.addLabel(label, value);
   }

    public static async addExpectedResult(description: string, expectationFunction: () => Promise<void>): Promise<void>
    {
        const testCaseReporter = ((browser.config as any).testCaseReporter);
        try
        {
            if (testCaseReporter)
            {
                testCaseReporter.onAssertStart(description);
            }

            allureReporter.startStep(description);
            await expectationFunction();
            allureReporter.endStep('passed');

            if (testCaseReporter)
            {
                testCaseReporter.onAssertEnd(description);
            }
        }
        catch (error)
        {
            allureReporter.endStep('failed');
            if (testCaseReporter)
            {
                testCaseReporter.onAssertEnd(description, true);
            }

            throw (error);
        }
    }
}
