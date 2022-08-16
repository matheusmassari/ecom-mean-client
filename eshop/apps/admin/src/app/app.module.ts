import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

//PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

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
            }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent],
    imports: [
        BrowserModule,
        RouterModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        CommonModule,
        ...UX_MODULE
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
