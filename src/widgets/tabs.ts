import { Widget } from './widget';
import { Tab } from '../widgets/tab';

export class Tabs extends Widget {

    public async getNumberOfTabs(): Promise<number> {
        return this.allByTagName('systelab-tab').count();
    }

    public async getTab(i: number): Promise<Tab> {
        return new Tab(this.allByTagName('li').get(i));
    }

    public async selectTab(i: number): Promise<void> {
        return this.allByTagName('li').get(i).click();
    }
}
