import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    deleteProduct(_id: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService
                    .deleteProduct(_id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category removed.' });
                            this._getProducts();
                        },
                        () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, try again later.' });
                        }
                    );
            }
        });
    }

    updateProduct(_id: any) {
        this.router.navigateByUrl(`products/form/${_id}`);
    }
}
