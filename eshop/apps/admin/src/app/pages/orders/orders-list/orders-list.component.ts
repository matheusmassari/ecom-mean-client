import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'admin-oders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;

    endsubs$: Subject<any> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    deleteOrder(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService
                    .deleteOrder(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
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
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (orders) => {
                    this.orders = orders;
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }
}
