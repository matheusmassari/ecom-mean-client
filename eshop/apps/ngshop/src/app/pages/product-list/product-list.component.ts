import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, ProductsService } from '@eshop/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngshop-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: any = [];
    categories: any = [];
    endsubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this._getProducts();
        this._getCategories();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.productsService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    categoryFilter() {
        const selectedCategories = this.categories
        .filter((category) => category.checked)
        .map((category) => category._id);
        this._getProducts(selectedCategories);
    }
}
