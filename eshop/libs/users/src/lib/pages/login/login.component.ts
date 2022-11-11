import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Invalid credentials.';

    constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.loginFormGroup.invalid) {
            return;
        }
        this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe({
            next: (user) => {
                this.authError = false;
                console.log(user);
            },
            error: (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Internal server error. Please try again later.';
                }
            }
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
