import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product, CategoriesService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {

    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentProductId: string;
    color: string;
    categories: any[];

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
        this._getCategories();        
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const product: Product = {
            id: this.currentProductId,
            name: this.productForm.name.value
        };
        if (this.editMode) {
            this._updateProduct(product);
        } else {
            this._createProduct(product);
        }
    }

    private _createProduct(product: Product) {
        this.productsService.createProduct(product).subscribe(
            (product: Product) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${product.name} added.` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to register product' });
            }
        );
    }

    private _updateProduct(product: Product) {
        this.productsService.updateProduct(product).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated.' });
                timer(2000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to register category' });
            }
        );
    }

    private _checkEditMode() {
        this.router.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentProductId = params.id;
                this.productsService.getSingleProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    // this.productForm.icon.setValue(product.icon);
                    // this.productForm.color.setValue(product.color);
                });
            }
        });
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: [''],
            isFeatured: ['']
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe({
            next: (categories) => {
                this.categories = categories
console.log(this.categories);
            },
            error: () => alert('Something went wrong while trying to get categories.')
        });
    }

    get productForm() {
        return this.form.controls;
    }
}
