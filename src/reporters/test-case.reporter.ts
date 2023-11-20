import WDIOReporter from '@wdio/reporter';
import colors from "colors";
import {browser} from "@wdio/globals";
import {TraceabilityUtility} from "../utils/traceability.util.js";


const jasmineTestCaseReporter =
{
    specStarted: (result: any) =>
    {
        (browser.options as any).currentJasmineSpec = result;
    },

    specDone: (result: any) =>
    {
        (browser.options as any).currentJasmineSpec = null;
    },
}

export class TestCaseReporter extends WDIOReporter
{
    indents: number = 0;
    startTime: any;
    failedExpectationsLogged: number = 0;

    constructor(options: any)
    {
        super(options)
        options = Object.assign(options, { stdout: true });
    }

    onRunnerStart(runnerStats: any)
    {
        // @ts-ignore
        jasmine.getEnv().addReporter(jasmineTestCaseReporter);
        (browser.options as any).testCaseReporter = this
        console.log("");
    }

    onSuiteStart(suiteStats: any)
    {
        this.indents++;
        console.log(colors.blue(`${this.indent()}${suiteStats.fullTitle}`));

        if (TraceabilityUtility.hasCoveredSpecs()) {
            this.indents++;
            console.log(colors.gray(`${this.indent()}Covered Specs: ${TraceabilityUtility.getCoveredSpecsPrettyString()}`));
            this.indents--;
        }
    }

    onTestStart(testStats: any)
    {
        this.indents++;
        this.startTime = new Date().getTime();
        this.failedExpectationsLogged = 0;
        console.log(`${this.indent()}${testStats.title}`);
    }

    onAssertStart(description: any)
    {
        this.logLatestErrors();
    }

    onAssertEnd(description: any, exception = false)
    {
        const nFailedExpectations =  (browser.options as any).currentJasmineSpec.failedExpectations.length;
        if (!exception && this.failedExpectationsLogged >= nFailedExpectations)
        {
            console.log(colors.green(`${" ".repeat(6)}✓ ${description}`));
        }
        else
        {
            console.log(colors.red(`${" ".repeat(6)}✖ ${description}`));
        }

        this.logLatestErrors();
    }

    onTestEnd(testStats: any)
    {
        this.logLatestErrors();

        this.indents++;
        const endTime = new Date().getTime();
        const duration = endTime - this.startTime;
        console.log(colors.gray(`${this.indent()}Time: ${duration} ms`));
        this.indents--;
        this.indents--;
    }

    onSuiteEnd(suiteStats: any)
    {
        this.indents--;
        console.log("");
    }

    indent()
    {
        return "  ".repeat(this.indents);
    }

    logLatestErrors()
    {
        const nFailedExpectations =  (browser.options as any).currentJasmineSpec.failedExpectations.length;
        for (let i = this.failedExpectationsLogged; i < nFailedExpectations; i++)
        {
            const failedExpectation = (browser.options as any).currentJasmineSpec.failedExpectations[i];
            console.log(colors.red(`${" ".repeat(8)}- ${failedExpectation.message}`));

            let stackMessage = "";
            const stackLines = failedExpectation.stack.split(/\n/).splice(1);
            for (const line of stackLines)
            {
                stackMessage += (stackMessage.length > 0) ? "\n" : "";
                stackMessage += `${" ".repeat(8)}${line}`;
            }
            console.log(stackMessage);
        }

        this.failedExpectationsLogged = nFailedExpectations;
    }
}
