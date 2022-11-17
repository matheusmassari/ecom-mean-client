import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent]
})
export class ProductsModule {}
