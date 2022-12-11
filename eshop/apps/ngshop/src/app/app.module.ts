import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';

// Internal project imports
import { ProductsModule } from '@eshop/products';
import { UiModule } from '@eshop/ui';

// PrimeNG
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'products/:productId',
        component: ProductDetailPageComponent
    },
    {
        path: 'category/:categoryId',
        component: ProductListComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        ProductDetailPageComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AccordionModule,
        BrowserAnimationsModule,
        ProductsModule,
        UiModule,
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        ButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [ProductDetailPageComponent]
})
export class AppModule {}
