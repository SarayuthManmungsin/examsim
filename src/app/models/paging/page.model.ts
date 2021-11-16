export class Page<T> {
    public data: T;
    public totalItems: number;
    public pageSize: number;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.data = data.data;
        this.totalItems = data.totalItems;
        this.pageSize = data.pageSize;
    }
}
