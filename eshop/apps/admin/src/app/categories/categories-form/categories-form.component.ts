import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentCategoryId: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({            
            name: ['', Validators.required],
            icon: ['', Validators.required]
        });
        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value
        };
        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._createCategory(category);
        }
    }

    get categoryForm() {
        return this.form.controls;
    }

    private _createCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added.' });
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

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated.' });
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
                this.currentCategoryId = params.id;
                this.categoriesService.getSingleCategory(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                });
            }
        });
    }
}
