import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')
    const confirmation = control.get('passwordConfirm')
    const differentPassword = password?.value !== confirmation?.value;

    return differentPassword ? { differentPassword: true } : null;
};
