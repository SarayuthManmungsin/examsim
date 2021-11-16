import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public title = 'Dashboard';

    constructor() {

    }

    public ngOnInit() {

    }
}
