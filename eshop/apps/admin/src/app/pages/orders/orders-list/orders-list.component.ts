import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

const ORDER_STATUS = {
    0: {
        label: 'Pending',
        color: 'primary'
    },
    1: {
        label: 'Processed',
        color: 'warning'
    },
    2: {
        label: 'Shipped',
        color: 'warning'
    },
    3: {
        label: 'Delivered',
        color: 'success'
    },
    4: {
        label: 'Failed',
        color: 'danger'
    }
};
@Component({
    selector: 'admin-oders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    deleteOrder(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(id).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order removed.' });
                        this._getOrders();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, try again later.' });
                    }
                );
            }
        });
    }

    showOrder(id) {
        this.router.navigateByUrl(`orders/${id}`);
    }

    _getOrders() {
        this.ordersService.getOrders().subscribe({
            next: (orders) => {
                this.orders = orders;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
