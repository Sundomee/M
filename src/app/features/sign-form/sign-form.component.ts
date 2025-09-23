import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { AuthService } from "../../services/auth.service";
import { SignupBody } from "../../utils/files/types";
import { passwordValidator } from "./validators/password-validator.directive";
import { DlTooltipDirective } from "../../shared/components/dl-tooltip/dl-tooltip.directive";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'sign-form',
    imports: [MatIcon, ReactiveFormsModule, DlTooltipDirective],
    templateUrl: 'sign-form.component.html',
    styleUrl: 'sign-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignFormComponent {

    caricamento: boolean = false
    public readonly mode: WritableSignal<'signup' | 'login'> = signal('signup')
    public readonly sign_group = new FormGroup<SignGroup>({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl(''),
        username: new FormControl(''),
        passwordConfirm: new FormControl(''),
    }, { validators: passwordValidator })

    private readonly authService: AuthService = inject(AuthService);

    constructor() {
        effect(() => {
            if (this.mode() === 'login') {

                if (this.sign_group.controls.passwordConfirm) this.sign_group.removeControl('passwordConfirm')
                if (this.sign_group.controls.username) this.sign_group.removeControl('username')

            } else {

                if (!this.sign_group.controls.passwordConfirm) this.sign_group.addControl('passwordConfirm', new FormControl(''))
                if (!this.sign_group.controls.username) this.sign_group.addControl('username', new FormControl(''),)

            }
        })

        this.sign_group.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
            console.log(this.sign_group.controls.email.errors);
            
        })
    }

    async signup() {

        const signupBody: SignupBody = {
            email: this.sign_group.controls.email.value ?? '',
            password: this.sign_group.controls.password.value ?? '',
            username: this.sign_group.controls.username?.value ?? '',
        }

        const signupResponse = await this.authService.signup(signupBody)
        console.log(signupResponse);
    }
}
6
interface SignGroup {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    passwordConfirm?: FormControl<string | null>;
    username?: FormControl<string | null>;

}