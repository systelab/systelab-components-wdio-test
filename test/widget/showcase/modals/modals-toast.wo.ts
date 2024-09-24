import {Button, Widget} from "../../../../src";


export class ModalsToast extends Widget {

  public getError(): Button {
    return new Button(this.allByTagName('systelab-button').get(0));
  }

  public getWarning(): Button {
    return new Button(this.allByTagName('systelab-button').get(1));
  }

  public getSuccess(): Button {
    return new Button(this.allByTagName('systelab-button').get(2));
  }

  public getInformation(): Button {
    return new Button(this.allByTagName('systelab-button').get(3));
  }

}
