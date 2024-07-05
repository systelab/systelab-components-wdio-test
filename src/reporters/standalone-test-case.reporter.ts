import {ScreenshotReporter} from "./screenshot.reporter";

const colors = require("colors");

import { TraceabilityUtility } from "../utils";

import CustomReporter = jasmine.CustomReporter
import JasmineStartedInfo = jasmine.JasmineStartedInfo
import JasmineDoneInfo = jasmine.JasmineDoneInfo
import SuiteResult = jasmine.SuiteResult
import SpecResult = jasmine.SpecResult


export class StandaloneTestCaseReporter implements CustomReporter {
    private indents = 0;
    private currentSpec: SpecResult | null = null;
    private startTime: number | null = null;
    private failedExpectationsLogged = 0;

    constructor() {
    }

    public getCurrentSpec(): SpecResult | null {
        return this.currentSpec;
    }

    public jasmineStarted(suiteInfo: JasmineStartedInfo): void {
        (jasmine.getEnv() as any).testCaseReporter = this;
        console.log("");
    }

    public suiteStarted(suite: SuiteResult): void {
        ScreenshotReporter.beforeSuite();
        this.indents++;
        console.log(colors.blue(`${this.indent()}${suite.description}`));

        if (TraceabilityUtility.hasCoveredSpecs()) {
            this.indents++;
            console.log(colors.gray(`${this.indent()}Covered Specs: ${TraceabilityUtility.getCoveredSpecsPrettyString()}`));
            this.indents--;
        }
    }
    
    public specStarted(spec: SpecResult): void {
        this.indents++;
        this.currentSpec = spec;
        this.startTime = new Date().getTime();
        this.failedExpectationsLogged = 0;
        console.log(`${this.indent()}${spec.description}`);
    }
    
    public onAssertStart(description: string): void {
        this.logLatestErrors();
    }

    public onAssertEnd(description: string, exception = false): void {
        const nFailedExpectations = (this.currentSpec as SpecResult).failedExpectations.length;
        if (!exception && this.failedExpectationsLogged >= nFailedExpectations) {
            console.log(colors.green(`${" ".repeat(6)}✓ ${description}`));
        }
        else {
            console.log(colors.red(`${" ".repeat(6)}✖ ${description}`));
        }

        this.logLatestErrors();
    }

    public specDone(result: SpecResult): void {
        this.logLatestErrors();

        this.indents++;
        const endTime = new Date().getTime();
        const duration = endTime - (this.startTime as number);
        console.log(colors.gray(`${this.indent()}Time: ${duration} ms`));
        this.indents--;
        this.indents--;

        this.currentSpec = null;
        this.startTime = null;
    }

    public suiteDone(result: SuiteResult): void {
        this.indents--;
        console.log("");
    }

    public jasmineDone(runDetails: JasmineDoneInfo): void {
    }

    private indent(): string {
        return "  ".repeat(this.indents);
    }

    private logLatestErrors(): void {
        const nFailedExpectations = (this.currentSpec as SpecResult).failedExpectations.length;
        for (let i = this.failedExpectationsLogged; i < nFailedExpectations; i++) {
            const failedExpectation = (this.currentSpec as SpecResult).failedExpectations[i];
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

