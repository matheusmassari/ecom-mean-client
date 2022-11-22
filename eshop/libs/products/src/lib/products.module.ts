import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductItemComponent } from './components/product-item/product-item.component';

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule, CarouselModule, ButtonModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductComponent, ProductItemComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductComponent, ProductItemComponent]
})
export class ProductsModule {}
