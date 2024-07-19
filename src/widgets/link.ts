import { Button } from './button';

export class Link extends Button {

    public getHref(): Promise<string> {
        return this.elem.getAttribute('href');
    }

    public getText(): Promise<string> {
        return this.elem.getText();
    }

    public async isDisabled(): Promise<boolean> {
        const buttonClass = await this.byTagName('button').getAttribute('class');
        return buttonClass.includes('disabled');
    }

    public async isEnabled(): Promise<boolean> {
        return !(await this.isDisabled());
    }

}
