import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@eshop/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngshop-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: any = [];
    categories: any = [];
    isCategoryPage: boolean;
    isLoading = true;

    endsubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.params.subscribe((params) => {
            params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
            params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
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
                this.isLoading = false;
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
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category._id);
        this._getProducts(selectedCategories);
    }

    noProducts() {
        return this.products.length === 0 && this.isLoading === false;
    }
}
