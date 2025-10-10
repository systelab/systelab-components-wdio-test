import WDIOReporter from '@wdio/reporter';
import colors from "colors";
import {TraceabilityUtility} from "../utils/traceability.util.js";


const jasmineTestCaseReporter =
{
    specStarted: (result) =>
    {
        jasmine.getEnv().currentJasmineSpec = result;
    },

    specDone: (result) =>
    {
        jasmine.getEnv().currentJasmineSpec = null;
    },
}

class TestCaseReporter extends WDIOReporter
{
    indents = 0;
    startTime;
    failedExpectationsLogged = 0;

    constructor(options)
    {
        super(options)
        options = Object.assign(options, { stdout: true });
    }

    onRunnerStart(runnerStats)
    {
        jasmine.getEnv().addReporter(jasmineTestCaseReporter);
        jasmine.getEnv().testCaseReporter = this;
        console.log("");
    }

    onSuiteStart(suiteStats)
    {
        this.indents++;
        console.log(colors.blue(`${this.indent()}${suiteStats.fullTitle}`));

        if (TraceabilityUtility.hasCoveredSpecs()) {
            this.indents++;
            console.log(colors.gray(`${this.indent()}Covered Specs: ${TraceabilityUtility.getCoveredSpecsPrettyString()}`));
            this.indents--;
        }
    }

    onTestStart(testStats)
    {
        this.indents++;
        this.startTime = new Date().getTime();
        this.failedExpectationsLogged = 0;
        console.log(`${this.indent()}${testStats.title}`);
    }

    onAssertStart(description)
    {
        this.logLatestErrors();
    }

    onAssertEnd(description, exception = false)
    {
        const nFailedExpectations = jasmine.getEnv().currentJasmineSpec.failedExpectations.length;
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

    onTestEnd(testStats)
    {
        this.logLatestErrors();

        this.indents++;
        const endTime = new Date().getTime();
        const duration = endTime - this.startTime;
        console.log(colors.gray(`${this.indent()}Time: ${duration} ms`));
        this.indents--;
        this.indents--;
    }

    onSuiteEnd(suiteStats)
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
        const nFailedExpectations = jasmine.getEnv().currentJasmineSpec.failedExpectations.length;
        for (let i = this.failedExpectationsLogged; i < nFailedExpectations; i++)
        {
            const failedExpectation = jasmine.getEnv().currentJasmineSpec.failedExpectations[i];
            console.log(colors.red(`${" ".repeat(8)}- ${failedExpectation.message}`));

            let stackMessage = "";
            const stackLines = failedExpectation?.stack?.split(/\n/).splice(1) ?? ['(no stack)'];
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

export default TestCaseReporter;
