import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    constructor(private ordersService: OrdersService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this._getOrder();
    }

    private _getOrder() {
        this.ordersService.getSingleOrder(this.route.snapshot.paramMap.get('id')).subscribe(
            (order) => {
                this.order = order;
                console.log(this.order)
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
