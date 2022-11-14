import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@eshop/orders';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    orderCount: any;
    totalSales: any;
    usersCount: any;
    productsCount: any;

    endsubs$: Subject<any> = new Subject();

    constructor(private ordersService: OrdersService, private usersService: UsersService, private productsService: ProductsService) {}

    ngOnInit(): void {
        this.getOrdersCount();
        this.getTotalSales();
        this.getUsersCount();
        this.getProductsCount();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    getOrdersCount() {
        this.ordersService
            .getOrderCount()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((res) => {
                this.orderCount = res.orderCount;
            });
    }

    getTotalSales() {
        this.ordersService
            .getTotalSales()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((res) => {
                this.totalSales = res.totalSales;
            });
    }

    getUsersCount() {
        this.usersService
            .getUsersCount()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((res) => {
                this.usersCount = res.userCount;
            });
    }

    getProductsCount() {
        this.productsService
            .getProductsCount()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((res) => {
                this.productsCount = res.productCount;
            });
    }
}
