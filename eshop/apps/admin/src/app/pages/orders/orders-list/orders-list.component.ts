import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@eshop/orders';

@Component({
  selector: 'admin-oders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = []

  constructor( private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getOrders()
  }

  deleteOrder(id) {
    console.log(id)
  }

  showOrder(id) {
    console.log(id)
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
