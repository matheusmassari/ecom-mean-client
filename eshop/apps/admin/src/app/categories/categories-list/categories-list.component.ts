import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    deleteCategory(_id: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(_id).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category removed.' });
                        this._getCategories();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, try again later.' });
                    }
                );
            },
            
        });
    }

    updateCategory(_id: any) {
        this.router.navigateByUrl(`categories/form/${_id}`);
    }
}
