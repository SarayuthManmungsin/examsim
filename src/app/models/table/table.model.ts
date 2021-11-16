import { TableColumnModel } from '@app/models/table/table-column.model';
import { TableActionModel } from '@app/models/table/table-action.model';

export class TableModel {

    public isReady = false;
    public columns: Array<TableColumnModel> = [];
    public rows: Array<any> = [];
    public actions: Array<TableActionModel> = [];
    public totalItems: number;
    public pageSize: number;
    public page: number;
    public reload: () => void;
    public onPageChange: () => void;
    public sourceUrl: string;

    public serializer: Function = (data: Array<any>) => {
        return data;
    }

    constructor(data?: any) {
        this.page = 1;
        if (data) {
            this.cast(data);
        }
    }

    public loadState() {
        this.isReady = false;
    }

    private cast(data) {
        this.isReady = data.isReady;
        this.sourceUrl = data.sourceUrl;
        if (data.columns && data.columns.length) {
            this.columns = data.columns;
        }
        if (data.rows && data.rows.length) {
            this.rows = data.rows;
        }
        if (data.serializer) {
            this.serializer = data.serializer;
        }
        this.totalItems = data.totalItems;
        this.pageSize = data.pageSize;
        this.onPageChange = data.onPageChange;
    }
}
