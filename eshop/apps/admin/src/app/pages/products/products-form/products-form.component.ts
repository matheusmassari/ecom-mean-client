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
    imageDisplay: string | ArrayBuffer;

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
        this._getCategories();
        this._checkEditMode();
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
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });
        if (this.editMode) {
            this._updateProduct(productFormData);
        } else {
            this._createProduct(productFormData);
        }
    }

    private _createProduct(productData) {
        this.productsService.createProduct(productData).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product added.` });
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

    private _updateProduct(productData) {
        this.productsService.updateProduct(productData, this.currentProductId).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product updated.` });
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

    private _checkEditMode() {
        this.router.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentProductId = params.id;
                this.productsService.getSingleProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.brand.setValue(product.brand);
                    this.productForm.price.setValue(product.price);
                    this.productForm.category.setValue(product.category.id);
                    this.productForm.countInStock.setValue(product.countInStock);
                    this.productForm.description.setValue(product.description);
                    this.productForm.richDescription.setValue(product.richDescription);
                    this.productForm.isFeatured.setValue(product.isFeatured);
                    this.imageDisplay = product.image;
                    this.productForm.image.setValidators([]);
                    this.productForm.image.updateValueAndValidity();
                });
            }
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: () => alert('Something went wrong while trying to get categories.')
        });
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({
                image: file
            });
            this.form.get('image').updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
                this.imageDisplay = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    get productForm() {
        return this.form.controls;
    }
}
