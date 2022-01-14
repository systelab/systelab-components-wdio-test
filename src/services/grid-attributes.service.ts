import { Grid } from '../widgets/grid';

export class GridAttributesService {

    public static async checkGridCell(grid: Grid, rowNumber: number, columnNumber: number, expectedText: string): Promise<void>
    {
        const objectAtRow = await grid.getValuesInRow(rowNumber);
        expect(objectAtRow[columnNumber]).toBe(expectedText);
    }

    public static async checkGridRow(grid: Grid, rowNumber: number, expectedTexts: string[]): Promise<void>
    {
        for(let i = 0; i < expectedTexts.length; i++)
        {
            await this.checkGridCell(grid, rowNumber, i, expectedTexts[i]);
        }
    }
}
