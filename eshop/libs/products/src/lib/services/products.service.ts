import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    // BASE URL DE PRODUTOS
    apiUrlProducts = environment.apiURL + 'products';

    constructor(private http: HttpClient) {}

    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
            return this.http.get<Product[]>(`${this.apiUrlProducts}/get/filter`, { params: params });
        }
        return this.http.get<Product[]>(this.apiUrlProducts);
    }

    getFeaturedProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrlProducts}/get/featured/6`);
    }

    getSingleProduct(productId: any): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrlProducts + '/', product);
    }

    updateProduct(product: Product, productId: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrlProducts}/${productId}`, product);
    }

    deleteProduct(productId: string) {
        return this.http.delete(`${this.apiUrlProducts}/${productId}`);
    }

    getProductsCount(): Observable<any> {
        return this.http.get(`${this.apiUrlProducts}/get/count`);
    }
}
