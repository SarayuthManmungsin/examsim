import { Component, OnInit, Input } from '@angular/core';
import { TableModel } from '@app/models/table/table.model';
import { RequestService } from '@app/modules/core/services/request.service';
import { PagingResponse } from '@app/models/responses/paging-response';
import { APIResponseWrapper } from '@app/models/responses/api-response-wrapper';

@Component({
    selector: 'app-table-component',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    public shuffleQuestions = true;
    public shuffleAnswers = true;
    public showAnswerButton = true;
    
    @Input() sourceUrl: string;

    @Input() model = new TableModel();

    constructor(private requestService: RequestService) {

    }

    public ngOnInit(): void {
        this.watchReload();
        this.prepareForRender();
        if (this.model.sourceUrl) {
            this.loadData();
        }
    }

    public onPageChange(page: number) {
        if (this.model.isReady) {
            this.model.page = page;
            this.model.loadState();
            this.loadData();
        }
    }

    private loadData() {
        this.requestService.get<APIResponseWrapper<PagingResponse>>(this.getRequestUrl())
            .then((res: APIResponseWrapper<PagingResponse>) => {
            this.model.rows = res.data.list;
            this.model.pageSize = res.data.pageSize;
            this.model.totalItems = res.data.totalItems;
            this.model.isReady = true;
            this.prepareForRender();
        });
    }

    private watchReload() {
        this.model.reload = () => {
            this.model.loadState();
            this.model.page = 1;
            this.loadData();
        };
    }

    private getRequestUrl(): string {
        return this.model.sourceUrl +
            '?page=' +
            this.model.page;
    }

    private prepareForRender() {
        this.calculateWidth();
    }

    private calculateWidth() {
        const tableWidthNoAction = 100;
        const tableWidthWithActions = 90;
        if (this.model.columns && this.model.columns.length) {
            const maxWidthRatio = this.model.actions && this.model.actions.length ?
                tableWidthWithActions : tableWidthNoAction;
            let columnsWidthSum = 0;
            this.model.columns.forEach((c) => {
                columnsWidthSum += c.width;
            });
            this.model.columns.forEach((c) => {
                c.widthPercent = c.width * (maxWidthRatio / columnsWidthSum);
            });
        }
    }
}
