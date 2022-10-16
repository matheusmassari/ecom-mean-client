import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@eshop/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: []
})
export class UsersFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId: string;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const userData = this.form.value;
        if (this.editMode) {
            this._updateUser(userData);
        } else {
            this._createUser(userData);
        }
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passwordHash: ['', Validators.required],
            phone: ['', Validators.required],
            street: ['', Validators.required],
            apartment: ['', Validators.required],
            zip: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            isAdmin: [false]
        });
    }

    private _createUser(userData: User) {
        console.log(userData);
        this.usersService.createUser(userData).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User has been created'
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            (error) => {
                console.log(error)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error while trying to create user. Try again later.'
                });
            }
        );
    }

    private _updateUser(userData) {
        this.usersService.updateUser(userData, this.currentUserId).subscribe(
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
        this.router.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentUserId = params.id;
                this.usersService.getSingleUser(params.id).subscribe((user) => {
                    this.userForm.name.setValue(user.name);
                    this.userForm.email.setValue(user.email);
                    this.userForm.phone.setValue(user.phone);
                    this.userForm.street.setValue(user.street);
                    this.userForm.apartment.setValue(user.apartment);
                    this.userForm.zip.setValue(user.zip);
                    this.userForm.city.setValue(user.city);
                    this.userForm.country.setValue(user.country);
                    this.userForm.isAdmin.setValue(user.isAdmin);
                    this.userForm.passwordHash.setValidators([]);
                    this.userForm.passwordHash.updateValueAndValidity();
                });
            }
        });
    }

    get userForm() {
        return this.form.controls;
    }
}
