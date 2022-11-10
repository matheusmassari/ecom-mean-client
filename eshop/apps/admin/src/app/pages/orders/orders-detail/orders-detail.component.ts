import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    orderStatuses = [];
    selectedStatus: any;

    constructor(private ordersService: OrdersService, private route: ActivatedRoute, private messageService: MessageService) {}

    ngOnInit(): void {
        this._mapOrderStatuses();
        this._getOrder();
    }

    private _mapOrderStatuses() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label,
                value: ORDER_STATUS[key].color
            };
        });
    }

    private _getOrder() {
        this.ordersService.getSingleOrder(this.route.snapshot.paramMap.get('id')).subscribe(
            (order) => {
                this.order = order;
                this.selectedStatus = order.status;
            },
            (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while trying to get order info.' });
                console.log(err);
            }
        );
    }

    onChange(event) {
        this.ordersService.updateOrder({ status: event.value }, this.order._id).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order updated.' });
                this._getOrder();
            },
            (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, try again later.' });
                console.log(err);
            }
        );
    }
}
