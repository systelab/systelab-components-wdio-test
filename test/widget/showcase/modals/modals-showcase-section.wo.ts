import {ModalsToast} from "./modals-toast.wo";
import {Widget} from "../../../../src";


export class ModalsShowcaseSection extends Widget {

  public getTooltip(): Widget {
    return new Widget(this.byTagName('showcase-tooltip'));
  }

  public getDialog(): Widget {
    return new Widget(this.byTagName('showcase-dialog'));
  }

  public getMessagePopup(): Widget {
    return new Widget(this.byTagName('showcase-message-popup'));
  }

  public getToast(): ModalsToast {
    return new ModalsToast(this.byTagName('showcase-toast'));
  }

}
