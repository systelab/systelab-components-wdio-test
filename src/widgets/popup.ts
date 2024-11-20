import { Button } from './button.js';
import { Widget } from './widget.js';

export class Popup extends Widget {

    public async getText(): Promise<string> {
        return this.elem.getText();
    }

    private async getButton(text: string): Promise<Button> {
        return new Button(this.byTagName('systelab-dialog-bottom').byButtonText(text));
    }
}
