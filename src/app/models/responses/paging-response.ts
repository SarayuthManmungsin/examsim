export class PagingResponse<T = any> {

    public list: Array<T>;

    public totalItems: number;

    public pageSize: number;

    public pageNumber: number;

    public totalPages: number;    

    public examTitle: string;

    constructor(data?: Partial<PagingResponse>) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data: Partial<PagingResponse>) {
        this.list = data.list;
        this.totalItems = data.totalItems;
        this.pageSize = data.pageSize;
        this.examTitle = data.examTitle;
        this.pageNumber = data.pageNumber;
        this.totalPages = data.totalPages;
    }
}
