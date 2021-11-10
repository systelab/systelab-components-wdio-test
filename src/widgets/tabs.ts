import { Widget } from './widget';
import { Tab } from '../widgets/tab';

export class Tabs extends Widget {

	public async getNumberOfTabs(): Promise<number> {
		return (await this.allByTagName('systelab-tab')).length;
	}

	public async getTab(i: number): Promise<Tab> {
		return new Tab((await this.allByTagName('li'))[i]);
	}

	public async selectTab(i: number): Promise<void> {
		await (await this.allByTagName('li'))[i].click();
	}
}