import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@eshop/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eshop-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit, OnDestroy {
    product: Product;
    quantity: number;

    endsubs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getProductData();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    getProductData() {
        this.route.params.subscribe((params) => {
            this.productsService
                .getSingleProduct(params.productId)
                .pipe(takeUntil(this.endsubs$))
                .subscribe((product) => {
                    this.product = product;
                    console.log(this.product);
                });
        });
    }

    addToCart() {
        console.log('Add to cart');
        // this.productsService.addToCart(this.product, this.quantity);
    }
}
