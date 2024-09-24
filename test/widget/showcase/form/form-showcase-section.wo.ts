import {InputFormComponent} from "./input-form-component.wo";
import {Widget} from "../../../../src";

export class FormShowcaseSection extends Widget {

  public getInputForm(): InputFormComponent {
    return new InputFormComponent(this.byTagName('showcase-input'));
  }

  public getTemplateDrivenFormsInputValidation(): Widget {
    return new Widget(this.byTagName('showcase-input-template-driven-form-validations'));
  }

  public getReactiveFormsInputValidation(): Widget {
    return new Widget(this.byTagName('showcase-input-reactive-forms-validations'));
  }

  public getFileSelector(): Widget {
    return new Widget(this.byTagName('showcase-file-selector'));
  }

  public getTextArea(): Widget {
    return new Widget(this.byTagName('showcase-textarea'));
  }

  // Pending to implement rest of page sections

}
