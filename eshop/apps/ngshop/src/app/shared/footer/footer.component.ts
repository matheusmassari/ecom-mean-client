import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngshop-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    date: any;

    constructor() {}

    ngOnInit(): void {
        this.getFullYear();
    }

    getFullYear() {
        this.date = new Date().getFullYear();        
    }
}
