import { Widget } from './widget';

export class Button extends Widget {

    public async click(): Promise<void> {
        await this.elem.click();
    }

    public async isClickable(): Promise<boolean> {
        return this.elem.isClickable();
    }

    public async waitUntilClickable(timeout: number = 500): Promise<void> {
        return this.elem.waitToBeClickable(timeout);
    }
}
