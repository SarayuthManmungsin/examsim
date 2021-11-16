import { RequestService } from '@app/modules/core/services/request.service';
import { PagingResponse } from '@app/models/responses/paging-response';

export interface IService<T> {
    request: RequestService;
    getAll(page: number): Promise<PagingResponse<T>>;
    get(id: number): Promise<T>;
    create(model: T): Promise<any>;
    update(model: T): Promise<any>;
    delete(id: number): Promise<any>;
}
