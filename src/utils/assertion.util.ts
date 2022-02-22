

export class AssertionUtility {

    public static expectEqual(toTest: any, expected: any): void {
        expect(toTest).toBe(expected);
    }

    public static expectDeepEqual(toTest: any, expected: any): void {
        expect(toTest).toEqual(expected);
    }

    public static expectTrue(toTest: any): void {
        expect(toTest).toBeTruthy();
    }

    public static expectFalse(toTest: any): void {
        expect(toTest).toBeFalsy();
    }

    public static expectContains(toTest: string, expectedSubstring: string): void {
        expect(toTest).toContain(expectedSubstring);
    }

    public static expectStartsWith(toTest: string, expectedPrefix: string): void {
        expect(toTest).toMatch('^' + expectedPrefix);
    }

    public static expectEndsWith(toTest: string, expectedSuffix: string): void {
        expect(toTest).toMatch(expectedSuffix + '$');
    }

    public static expectToMatch(toTest: string, expectedRegExp: RegExp): void {
        expect(toTest).toMatch(expectedRegExp);
    }

    public static expectNear(toTest: number, expected: number, tolerance: number): void {
        expect(toTest).toBeCloseTo(expected, tolerance);
    }

    public static expectGreater(toTest: number, threshold: number): void {
        expect(toTest).toBeGreaterThan(threshold);
    }

    public static expectGreaterOrEqual(toTest: number, threshold: number): void {
        expect(toTest).toBeGreaterThanOrEqual(threshold);
    }

    public static expectLower(toTest: number, threshold: number): void {
        expect(toTest).toBeLessThan(threshold);
    }

    public static expectLowerOrEqual(toTest: number, threshold: number): void {
        expect(toTest).toBeLessThanOrEqual(threshold);
    }
}
