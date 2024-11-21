import { Widget } from './widget.js';

export class RadioButton extends Widget {

    public async isSelected(): Promise<boolean> {
        return this.elem.isSelected();
    }
}
