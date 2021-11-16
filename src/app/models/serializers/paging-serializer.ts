interface IPagingModel {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    list: Array<any>;
    pageNumber: number;
    pageSize: number;
    previousPageNumber: number;
    totalItems: number;
    totalPages: number;
}
