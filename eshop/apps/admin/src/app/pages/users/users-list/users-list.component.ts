import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User, UsersService } from '@eshop/users';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to get users, try again later.' });
            }
        });
    }

    private _updateUser(_id: any) {
        this.router.navigateByUrl(`users/form/${_id}`);
    }

    private _deleteUser(_id: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(_id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User removed.' });
                        this._getUsers();
                    },
                    error: (error) => {
                        console.log(error)
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, try again later.' });
                    }
                });
            }
        });
    }
}
