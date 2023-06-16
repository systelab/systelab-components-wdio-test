import { Widget } from "./widget";

export class Spinner extends Widget {

    public async clear(): Promise<void>  {
        return this.byTagName('input').clear();
    }

    public async setText(text: string): Promise<void> {
       return this.byTagName('input').write(text);
    }

    public async getText(): Promise<string> {
        return this.byTagName('input').getValue();
    }

    public async increase(): Promise<void> {
        return this.byClassName('input-group-append').click();
    }

    public async decrease(): Promise<void> {
        return this.byClassName('input-group-prepend').click();
    }
}
