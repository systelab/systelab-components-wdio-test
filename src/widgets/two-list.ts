import { Widget } from './widget';
import { Label } from './label';
import { InputField } from './inputfield';
import { Button } from './button';
import { ElementArrayFinder, ElementFinder } from '../wdio';
import { Link } from './link';

export class TwoList extends Widget {

    public getAvailableFieldsCaption(): Label {
        return new Label(this.allByCSS('div > div> label').get(0));
    }

    public getVisibleFieldsCaption(): Label {
        return new Label(this.allByCSS('div > div > label').get(1));
    }

    public getAvailableFieldsFilter(): InputField {
        return new InputField(this.allByCSS('div > div> input').get(0));
    }

    public getVisibleFieldsFilter(): InputField {
        return new InputField(this.allByCSS('div > div> input').get(1));
    }

    public getAvailableItemByPosition(position: number): Button {
        return new Button(this.byId('available' + (position - 1)));
    }

    public getVisibleItemByPosition(position: number): Button {
        return new Button(this.byId('element' + (position - 1)));
    }

    public getMoveToRightButton(): Button {
        return new Button(this.byClassName('icon-angle-right'));
    }

    public getMoveToLeftButton(): Button {
        return new Button(this.byClassName('icon-angle-left'));
    }

    public async getNumberOfAvailableItems(): Promise<number> {
        return (await this.getAllAvailableElemItems()).count();
    }

    public async getNumberOfSelectedAvailableItems(): Promise<number> {
        return (await this.getSelectedAvailableElemItems()).count();
    }

    public async getNumberOfVisibleItems(): Promise<number> {
        return (await this.getAllVisibleElemItems()).count();
    }

    public async getNumberOfSelectedVisibleItems(): Promise<number> {
        return (await this.getSelectedVisibleElemItems()).count();
    }

    public async getAllAvailableItems(): Promise<string[]> {
        const itemList: string[] = [];
        let elemItem: ElementFinder;
        for (let position = 1; position <= (await this.getNumberOfAvailableItems()); position++) {
            elemItem = this.byCSS(`[id^=available${position - 1}]`);
            itemList.push(await elemItem.getText());
        }
        return itemList;
    }

    public async getAllVisibleItems(): Promise<string[]> {
        const itemList: string[] = [];
        let elemItem: ElementFinder;
        const elemItems = await this.getAllVisibleElemItems();
        const numberOfVisibleItems = await elemItems.count();
        for (let position = 1; position <= numberOfVisibleItems; position++) {
            elemItem = (await this.getAllVisibleElemItems()).get(position - 1);
            itemList.push(await elemItems.get(position - 1).getText());
        }
        return itemList;
    }

    public async getSelectedAvailableItemPositions(): Promise<number[]> {
        const positionList: number[] = [];
        const elemItems = await this.getSelectedAvailableElemItems();
        const numberOfSelectedItems = await elemItems.count();
        for (let index = 0; index < numberOfSelectedItems; index++) {
            let positionOfSelectedItem = parseInt((await elemItems.get(index).getAttribute('id')).replace('available', '')) + 1;
            positionList.push(positionOfSelectedItem);
        }
        return positionList;
    }

    public async getSelectedVisibleItemPositions(): Promise<number[]> {
        const positionList: number[] = [];
        const elemItems = await this.getSelectedVisibleElemItems();
        const numberOfSelectedItems = await elemItems.count();
        for (let index = 0; index < numberOfSelectedItems; index++) {
            let positionOfSelectedItem = parseInt((await elemItems.get(index).getAttribute('id')).replace('element', '')) + 1;
            positionList.push(positionOfSelectedItem);
        }
        return positionList;
    }

    private async getAllVisibleElemItems(): Promise<ElementArrayFinder> {
        return this.allByCSS('div[class~="list-group"] > div[class~="slab-sortable-list-row"]');
    }

    private async getAllAvailableElemItems(): Promise<ElementArrayFinder> {
        return this.allByCSS('li[id^=available]');
    }

    private async getSelectedVisibleElemItems(): Promise<ElementArrayFinder> {
        return this.allByCSS('div[class~="list-group"] > div[class~="slab-sortable-list-row-selected"]');
    }

    private async getSelectedAvailableElemItems(): Promise<ElementArrayFinder> {
        return this.allByCSS('li[class~="slab-twolistboxrowselected"]');
    }

    public getRemoveAllLink(): Link {
        return new Link(this.byId('slab-remove-all'));
    }

    public getAddAllLink(): Link {
        return new Link(this.byId('slab-add-all'));
    }

}
