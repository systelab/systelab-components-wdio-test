import { Widget } from './widget';

export class Checkbox extends Widget {

    public async isSelected(): Promise<boolean> {
        return this.elem.isSelected();
    }
}
