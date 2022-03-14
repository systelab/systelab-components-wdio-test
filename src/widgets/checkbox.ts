import { Widget } from './widget';

export class Checkbox extends Widget {
    public async toggle(): Promise<void> {
        return this.elem.click();
    }

    public async isSelected(): Promise<boolean> {
        return this.elem.isSelected();
    }
}
