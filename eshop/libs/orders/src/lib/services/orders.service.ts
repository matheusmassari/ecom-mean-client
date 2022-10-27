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

    updateOrder(order: Order, orderId: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, order);
    }

    deleteOrder(orderId: string) {
        return this.http.delete(`${this.apiUrlOrders}/${orderId}`);
    }
}
