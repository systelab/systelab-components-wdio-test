
/// <reference types="jasmine" />
/// <reference types="jasminewd2" />
declare const allure: any;

class MyExpectation {
	constructor(public reason: string) {
	}
	public expect<T>(actual: T): jasmine.Matchers<T> {
		if (this.reason) {
			return allure.createStep(this.reason, function () {
				return this.expect(actual);
			})();
		} else {
			return this.expect(actual);
		}
	}
}

export function because(reason: string): MyExpectation {
	return new MyExpectation(reason);
}