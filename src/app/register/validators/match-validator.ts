import {AbstractControl, FormGroup, ValidationErrors, Validator} from '@angular/forms';

export class MatchValidator implements Validator {

  constructor(private controlName: string, private matchingControlName: string) {
  }

  validate(control: AbstractControl): ValidationErrors {
    const originControl = control.get(this.controlName);
    const matchingControl = control.get(this.matchingControlName);

    // return if another validator has already found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors.match) {
      return matchingControl.errors;
    }

    // set error on matchingControl if validation fails
    if (originControl.value !== matchingControl.value) {
      matchingControl.setErrors({match: true});
    } else {
      matchingControl.setErrors(null);
    }

    return matchingControl.errors;
  }
}
