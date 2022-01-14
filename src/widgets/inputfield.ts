import { Widget } from './widget';

export class InputField extends Widget {

    public async clear(): Promise<void> {
        await (await this.elem).clearValue();
    }

    public async setText(text: string): Promise<void> {
        await (await this.elem).setValue(text);
    }

    public async getText(): Promise<string> {
        return (await this.elem).getValue();
    }

    public async isEnabled(): Promise<boolean> {
        return (await this.elem).isEnabled();
    }

}
