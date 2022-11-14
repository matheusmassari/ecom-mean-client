import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@eshop/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import * as countriesLib from "i18n-iso-countries";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const require;


@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: []
})
export class UsersFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId: string;
    countries: any[] = [];

    endsubs$: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCountries();
        this._checkEditMode();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: [''],
            street: ['', Validators.required],
            apartment: ['', Validators.required],
            zip: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            isAdmin: [false]
        });
    }

    private _createUser(userData: User) {
        this.usersService
            .createUser(userData)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (user: User) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `User has been created.`
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error while trying to create user. Try again later.'
                    });
                }
            );
    }

    private _updateUser(userData) {
        console.log(userData);
        this.usersService
            .updateUser(userData, this.currentUserId)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User has been updated'
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error while trying to update user. Try again later.'
                    });
                }
            );
    }

    private _checkEditMode() {
        this.router.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentUserId = params.id;
                this.usersService
                    .getSingleUser(params.id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe((user) => {
                        this.userForm.name.setValue(user.name);
                        this.userForm.email.setValue(user.email);
                        this.userForm.phone.setValue(user.phone);
                        this.userForm.street.setValue(user.street);
                        this.userForm.apartment.setValue(user.apartment);
                        this.userForm.zip.setValue(user.zip);
                        this.userForm.city.setValue(user.city);
                        this.userForm.country.setValue(user.country);
                        this.userForm.isAdmin.setValue(user.isAdmin);

                        this.userForm.password.setValidators([]);
                        this.userForm.password.updateValueAndValidity();
                    });
            }
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const user: User = {
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            phone: this.userForm.phone.value,
            isAdmin: this.userForm.isAdmin.value,
            street: this.userForm.street.value,
            apartment: this.userForm.apartment.value,
            zip: this.userForm.zip.value,
            city: this.userForm.city.value,
            password: this.userForm.password.value,
            country: this.userForm.country.value
        };
        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._createUser(user);
        }
    }

    private _getCountries() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                name: entry[1],
                id: entry[0]
            };
        });
    }

    get userForm() {
        return this.form.controls;
    }
}
