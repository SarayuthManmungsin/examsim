import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '@app/modules/core/services/route-guard.service';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { BaseTenantComponent } from '@app/modules/tenant/components/base/base-tenant.component';
import { TenantsComponent } from '@app/modules/tenant/components/tenants/tenants.component';

const tenantRoutes: Routes = [
    {
        path: '',
        component: BaseTenantComponent,
        children: [
            {
                path: '',
                component: TenantsComponent,
                canActivate: [
                    RouteGuardService
                ],
                data: {
                    permissions: [
                        [new RoutePermissionModel({ permission: PermissionRole.Tenants, actions: [PermissionAction.Read] })]
                    ]
                }
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(tenantRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TenantRoutingModule { }
