import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    // BASE URL DE PRODUTOS
    apiUrlProducts = environment.apiURL + 'products'

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrlProducts);
    }

    getSingleProduct(productId: any): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrlProducts + '/', product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrlProducts}/${product.id}`, product);
    }

    deleteProduct(productId: string) {
        return this.http.delete(`${this.apiUrlProducts}/${productId}`);
    }
}
