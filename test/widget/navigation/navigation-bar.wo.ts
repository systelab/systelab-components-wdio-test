import {Button} from "../../../src";


export class NavigationBar extends Button {

  public getFormComponents(): Button {
    return new Button(this.byId('nav-0'));
  }

  public getModals(): Button {
    return new Button(this.byId('nav-1'));
  }

  public getNavigation(): Button {
    return new Button(this.byId('nav-2'));
  }

  public getTables(): Button {
    return new Button(this.byId('nav-3'));
  }

  public getUtils(): Button {
    return new Button(this.byId('nav-4'));
  }

  public getIcons(): Button {
    return new Button(this.byId('nav-5'));
  }

  public getStyles(): Button {
    return new Button(this.byId('nav-6'));
  }
}
