import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    // BASE URL DE CATEGORIAS
    apiUrlCategories = environment.apiURL + 'categories'

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrlCategories);
    }

    getSingleCategory(categoryId: any): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrlCategories + '/', category);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrlCategories}/${category.id}`, category);
    }

    deleteCategory(categoryId: string) {
        return this.http.delete(`${this.apiUrlCategories}/${categoryId}`);
    }
}
