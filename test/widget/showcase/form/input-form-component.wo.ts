import {InputField, Widget} from "../../../../src";


export class InputFormComponent extends Widget {

  public getFullWidth(): InputField {
    return new InputField(this.byId('full-width-input'));
  }

  public getNumberInput(): InputField {
    return new InputField(this.byId('number-input'));
  }

  public getSmallWidth(): InputField {
    return new InputField(this.byId('small-input'));
  }

  public getDisabledInput(): InputField {
    return new InputField(this.byId('disabled-input'));
  }

  // Pending to implement rest of them
}
