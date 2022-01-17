import { Widget } from './widget';

export class Tab extends Widget {

    public async getText(): Promise<string> {
        return this.byTagName('span').getText();
    }
}
