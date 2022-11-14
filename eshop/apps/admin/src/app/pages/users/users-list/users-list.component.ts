import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User, UsersService } from '@eshop/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: []
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: User[] = [];
    countries = [];

    endsubs$: Subject<any> = new Subject();

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (users) => {
                    this.users = users;
                    console.log(this.users);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Something went wrong while trying to get users, try again later.'
                    });
                }
            });
    }

    updateUser(_id: string) {
        this.router.navigateByUrl(`users/form/${_id}`);
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService
                    .deleteUser(userId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getUsers();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'User is deleted!'
                            });
                        },
                        (error) => {
                            console.log(error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'User is not deleted!'
                            });
                        }
                    );
            }
        });
    }

    getCountryName(countryKey: string) {
        if (countryKey) {
            return this.usersService.getCountry(countryKey);
        }
    }
}
