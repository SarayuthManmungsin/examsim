import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-pagging-component',
    templateUrl: './pagging.component.html',
    styleUrls: ['./pagging.component.scss']
})

export class PaggingComponent implements OnInit, OnChanges {

    @Input() total: number;

    @Input() pageSize: number;

    @Input() currentPage = 1;

    public totalPage = 1;

    public disableNext = false;

    public disablePrev = true;

    public pages: Array<number> = [];

    @Output() change = new EventEmitter();

    constructor() {

    }

    public ngOnInit(): void {
        this.calculatePagging();
    }

    public ngOnChanges() {
        this.calculatePagging();
    }

    public toPage(page: number) {
        if (page !== 0 && page !== this.currentPage) {
            this.currentPage = page;
            this.pageChanged();
        }
    }

    public next() {
        if (this.currentPage < this.totalPage) {
            this.currentPage++;
            this.pageChanged();
        }
    }

    public prev() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageChanged();
        }
    }

    public onPageChange(event) {
        if (!isNaN(parseInt(this.currentPage + '', 10)) && this.currentPage > 0 && this.currentPage <= this.totalPage) {
            this.change.emit(parseInt(this.currentPage + '', 10));
        }
    }

    private pageChanged() {
        this.updateNavigation();
        this.triggerChange();
        this.createPages();
    }

    private triggerChange() {
        this.change.emit(this.currentPage);
    }

    private updateNavigation() {
        if (this.currentPage > 1) {
            this.disablePrev = false;
        } else {
            this.disablePrev = true;
        }
        if (this.currentPage < this.totalPage) {
            this.disableNext = false;
        } else {
            this.disableNext = true;
        }
    }

    private calculatePagging() {
        if (!this.pageSize) {
            this.pageSize = 20;
        }
        if (this.total && this.total > 0) {
            this.totalPage = Math.ceil(this.total / this.pageSize);
        }
        this.updateNavigation();
        this.createPages();
    }

    private createPages() {
        this.pages = [];
        this.pages.push(1);
        if (this.totalPage <= 5) {
            for (let i = 2; i <= this.totalPage; i++) {
                this.pages.push(i);
            }
        } else {
            if (this.currentPage > 3) {
                this.pages.push(0);
            }
            if (this.currentPage > this.totalPage - 3) {
                for (let i = this.totalPage - 3; i <= this.totalPage; i++) {
                    this.pages.push(i);
                }
            } else if (this.currentPage > 3) {
                for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    this.pages.push(i);
                }
            } else {
                for (let i = 2; i <= 4; i++) {
                    this.pages.push(i);
                }
            }
            if (this.currentPage < this.totalPage - 2) {
                this.pages.push(0);
                this.pages.push(this.totalPage);
            }
        }
    }

    public onCurrentPageChange(toPage) {
        let page = +toPage;
        if (toPage > this.totalPage) {
            page = +this.totalPage;
        } else if (toPage < 1) {
            page = 1;
        }
        this.currentPage = page;
        this.updateNavigation();
        this.triggerChange();
    }
}
