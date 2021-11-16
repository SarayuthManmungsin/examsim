import { Injectable } from '@angular/core';
import { RequestService } from '@app/modules/core/services/request.service';
import { Endpoints } from '@app/configs/endpoints';
import { IService } from '@app/modules/core/services/interface.service';
import { BaseService } from '@app/modules/core/services/base.service';
import { TenantViewModel } from '@app/models/tenants/tenant-view.model';
import { ServiceEndpoints } from '@app/models/endpoints/service-endpoints.model';

@Injectable({
    providedIn: 'root',
})
export class TenantService extends BaseService<TenantViewModel> implements IService<TenantViewModel> {

    constructor(public request: RequestService) {
        super(request, new ServiceEndpoints({
            get: '',
            getAll: Endpoints.GetAllTenants,
            create: Endpoints.CreateTenants,
            update: '',
            delete: '',
        }), TenantViewModel.makeList);
    }
}
