import { Widget } from './widget';
import { ElementArrayFinder } from '../wdio';

export interface ToggleSelectorOption {
    id: string;
    caption: string;
}

export class ToggleSelector extends Widget {

    public async selectOptionById(optionId: string) {
        await this.byId(optionId).click();
    }

    public async getSelectedOption(): Promise<string> {
        return this.byClassName('slab-option slab-selected ng-star-inserted').getText();
    }

    public async getOptions(): Promise<ToggleSelectorOption[]> {
        const optionArray: ToggleSelectorOption[] = [];
        const options: ElementArrayFinder = this.allByCSS("div[class*='slab-option']");
        const numberOfOptions: number = await options.count();
        for (let i = 0; i < numberOfOptions; i++) {
            // We need to remove the first 2 chars because id's are being created always with 'id' prefixing the string
            const id: string = (await options.get(i).getAttribute('id')).slice(2);
            const caption: string = await options.get(i).getText();
            const option: ToggleSelectorOption = {
                id: id,
                caption: caption,
            };
            optionArray.push(option);
        }
        return optionArray;
    }
}
