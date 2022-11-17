import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';


@Component({
    selector: 'products-categories',
    templateUrl: './categories-banner.component.html',
    styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories:any = [];

    endsubs$: Subject<any> = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.getCategories();
    }

    ngOnDestroy(): void {}

    getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories;
                
            });
    }
}
