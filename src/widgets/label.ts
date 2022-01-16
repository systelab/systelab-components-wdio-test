import { Widget } from './widget';

export class Label extends Widget {

    public async getText(): Promise<string> {
        return this.elem.getText();
    }

    public async click(): Promise<void> {
        await this.elem.click();
    }
}
