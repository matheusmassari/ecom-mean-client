import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule, CarouselModule, ButtonModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductComponent]
})
export class ProductsModule {}
