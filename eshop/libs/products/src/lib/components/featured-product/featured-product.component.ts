import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-featured',
    templateUrl: './featured-product.component.html',
    styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit, OnDestroy {
    featuredProducts: any;
    responsiveOptions: any;

    endsubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    ngOnInit(): void {
        this._getFeaturedProducts();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    private _getFeaturedProducts() {
        this.productsService
            .getFeaturedProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.featuredProducts = products;
                console.log(products);
                
            });
    }
}
