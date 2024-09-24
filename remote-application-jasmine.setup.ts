import {SpecReporter, StacktraceOption} from 'jasmine-spec-reporter';
import {StandaloneTestCaseReporter} from "./src";


const specReporter: SpecReporter = new SpecReporter({
  spec: {
    displayErrorMessages: false,
    displayStacktrace: StacktraceOption.NONE,
    displaySuccessful: false,
    displayFailed: false,
    displayPending: false,
    displayDuration: false,
  },
  summary: {
    displayErrorMessages: false,
    displayStacktrace: StacktraceOption.NONE,
    displaySuccessful: false,
    displayFailed: false,
    displayPending: false,
    displayDuration: true,
  }
});


jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(specReporter);
jasmine.getEnv().addReporter(new StandaloneTestCaseReporter());
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
