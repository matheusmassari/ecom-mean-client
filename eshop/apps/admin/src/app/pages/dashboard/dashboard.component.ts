import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@eshop/orders';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    orderCount: any;
    totalSales: any;
    usersCount: any;
    productsCount: any;

    constructor(private ordersService: OrdersService, private usersService: UsersService, private productsService: ProductsService) {}

    ngOnInit(): void {
        this.getOrdersCount();
        this.getTotalSales();
        this.getUsersCount();
        this.getProductsCount();
    }

    getOrdersCount() {
        this.ordersService.getOrderCount().subscribe((res) => {
            this.orderCount = res.orderCount;
        });
    }

    getTotalSales() {
        this.ordersService.getTotalSales().subscribe((res) => {
            this.totalSales = res.totalSales;
        });
    }

    getUsersCount() {
        this.usersService.getUsersCount().subscribe((res) => {
            this.usersCount = res.userCount;
        });
    }

    getProductsCount() {
        this.productsService.getProductsCount().subscribe((res) => {
            this.productsCount = res.productCount;
        });
    }
}
