import {FormShowcaseSection} from "../widget/showcase/form/form-showcase-section.wo";
import {ModalsShowcaseSection} from "../widget/showcase/modals/modals-showcase-section.wo";
import {BasePage} from "../../src";
import {NavigationBar} from "../widget/navigation/navigation-bar.wo";
import {Toast} from "../widget/common/toast.wo";

export class ComponentsPage extends BasePage {
  private static instance: ComponentsPage;

  private constructor() {
    super('app-root');
  }

  public static get(): ComponentsPage {
    return ComponentsPage.instance ? this.instance : (this.instance = new ComponentsPage());
  }

  public getFormShowcaseSection(): FormShowcaseSection {
    return new FormShowcaseSection(this.byTagName('showcase-components'))
  }

  public getModalsShowcaseSection(): ModalsShowcaseSection {
    return new ModalsShowcaseSection(this.byTagName('showcase-components'))
  }

  public getNavigationBar(): NavigationBar {
    return new NavigationBar(this.byTagName('systelab-navbar'));
  }

  public getToastPopup(): Toast {
    return new Toast();
  }

}
