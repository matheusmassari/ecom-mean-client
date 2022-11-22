import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
    @Input() product: any;
    constructor() {}

    ngOnInit(): void {}
}
