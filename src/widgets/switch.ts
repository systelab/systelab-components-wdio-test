import { Button } from "./button";


export class Switch extends Button {

    public async isChecked(): Promise<boolean> {
        return this.byCSS("input").isSelected();
    }

    public async isEnabled(): Promise<boolean> {
        return this.byCSS("input").isEnabled();
    }

    public async isDisabled(): Promise<boolean> {
        return !(await this.isEnabled());
    }

    public async toggle(): Promise<void> {
        return this.click();
    }
}
