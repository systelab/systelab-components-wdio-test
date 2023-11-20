import {ReportUtility} from "./report.util.js";

export class TraceabilityUtility {
    private static coveredSpecs: Set<string> = new Set<string>();

    public static registerCoveredSpecs(specList: string[]): void {
        this.addCoveredSpecs(specList);
        this.dumpCoveredSpecs();
        this.clearCoveredSpecs();
    }

    public static addCoveredSpecs(specsList: string[]): void {
        specsList.forEach(spec => this.coveredSpecs.add(spec));
    }

    public static clearCoveredSpecs(): void {
        this.coveredSpecs.clear();
    }

    public static dumpCoveredSpecs(): void {
        ReportUtility.addLabel("coveredSpecs", this.getCoveredSpecsPrettyString());
    }

    public static getCoveredSpecsPrettyString(): string {
        return [...this.coveredSpecs].sort().join(', ');
    }

    public static hasCoveredSpecs(): boolean {
        return this.coveredSpecs.size > 0;
    }
}
