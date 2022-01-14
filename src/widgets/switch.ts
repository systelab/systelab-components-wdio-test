import { Button } from "./button";


export class Switch extends Button {

    public async isChecked(): Promise<boolean> {
        return (await this.byCSS("input")).isSelected();
    }

    public async isEnabled(): Promise<boolean> {
        return (await this.byCSS("input")).isEnabled();
    }

    public async isDisabled(): Promise<boolean> {
        return !(await this.isEnabled());
    }

    public async toogle(): Promise<void> {
        return this.click();
    }
}
