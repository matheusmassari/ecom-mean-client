import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Invalid credentials.';

    endsubs$: Subject<any> = new Subject();

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private localStorageService: LocalStorageService, private router: Router) {}

    ngOnInit(): void {
        this._initForm();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
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
        this.auth
            .login(this.loginForm.email.value, this.loginForm.password.value)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (user) => {
                    this.authError = false;
                    this.localStorageService.setToken(user.token);
                    this.router.navigate(['/']);
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
