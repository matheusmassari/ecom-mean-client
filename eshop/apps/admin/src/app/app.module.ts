import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesService } from '@eshop/products';

//PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';



const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
]

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent, CategoriesFormComponent],
    imports: [
        BrowserModule,
        RouterModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        CommonModule,
        HttpClientModule,
        ...UX_MODULE
    ],
    providers: [CategoriesService],
    bootstrap: [AppComponent]
})
export class AppModule {}
