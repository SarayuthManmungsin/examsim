import {IService} from '@app/modules/core/services/interface.service';
import {RequestService} from '@app/modules/core/services/request.service';
import {ServiceEndpoints} from '@app/models/endpoints/service-endpoints.model';
import { PagingResponse } from '@app/models/responses/paging-response';

export class BaseService<T> implements IService<T> {

    public request: RequestService;
    public endpoints: ServiceEndpoints;
    public dataSerializer:  (data: any) => T[];

    constructor(
        public rq: RequestService,
        public serviceEndpoints?: ServiceEndpoints,
        public serializer?:  (data: any) => T[]
    ) {
        this.endpoints = serviceEndpoints;
        this.request = rq;
        this.dataSerializer = serializer;
    }

    public get(id: number | string): Promise<T> {
        return this.request.get(this.endpoints.get + '/' + id);
    }

    public async getAll(page: number): Promise<PagingResponse<T>> {
        const apiResponse = await this.request.get(this.endpoints.getAll + '?page=' + page);
        let res = new PagingResponse<T>({
            totalItems: apiResponse.data.totalItems,
            list: apiResponse.data.list,
            pageSize: apiResponse.data.pageSize,
            pageNumber: apiResponse.data.pageNumber
        });
        if (this.dataSerializer) {
            res.list = this.dataSerializer(res.list);
        }
        return res;
    }

    public create(model: T): Promise<T> {
        return this.request.post(this.endpoints.create, model);
    }

    public update(model: T): Promise<T> {
        return this.request.patch(this.endpoints.update, model);
    }

    public delete(id: number | string): Promise<T> {
        return this.request.delete(this.endpoints.delete + '/' + id);
    }
}
