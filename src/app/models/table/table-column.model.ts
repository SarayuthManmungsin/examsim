import { TableColumnTypes } from '@app/models/table/table-column-types';

export class TableColumnModel {
    public title: string;
    public key: string;
    public dataType: TableColumnTypes;
    public width: number;
    public widthPercent: number;

    constructor(data?: any) {
        this.title = '';
        this.key = '';
        this.dataType = TableColumnTypes.Text;

        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.title = data.title;
        this.key = data.key;
        this.dataType = data.dataType;
        this.width = data.width;
    }
}
