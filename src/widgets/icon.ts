import { Widget } from './widget.js';

export class Icon extends Widget {
    public async click(): Promise<void> {
        return this.elem.click();
    }
}
