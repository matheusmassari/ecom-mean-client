import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    // BASE URL DE ORDEMS
    apiUrlOrders = environment.apiURL + 'orders';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrlOrders);
    }

    getSingleOrder(orderId: any): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiUrlOrders + '/', order);
    }

    updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus);
    }

    deleteOrder(orderId: string) {
        return this.http.delete(`${this.apiUrlOrders}/${orderId}`);
    }

    getOrderCount(): Observable<any> {
        return this.http.get(`${this.apiUrlOrders}/get/order-count`);
    }

    getTotalSales(): Observable<any> {
        return this.http.get(`${this.apiUrlOrders}/get/total-sales`);
    }
}
