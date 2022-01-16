import { Widget } from './widget';

export class InputField extends Widget {

    public async clear(): Promise<void> {
        return this.elem.clear();
    }

    public async setText(text: string): Promise<void> {
        return this.elem.write(text);
    }

    public async getText(): Promise<string> {
        return this.elem.getText();
    }

    public async isEnabled(): Promise<boolean> {
        return this.elem.isEnabled();
    }
}
