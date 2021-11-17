
import jasmine from 'jasmine'; // or add 'jasmine' to types line in tsconfig.json
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