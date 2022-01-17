import { Widget } from './widget';

export class Icon extends Widget {
    public async click(): Promise<void> {
        return this.elem.click();
    }
}
