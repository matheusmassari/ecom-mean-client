import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User } from '@eshop/users';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: []
})
export class UsersListComponent implements OnInit {

    users: User[] = [];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {}

    ngOnInit(): void {}
}
