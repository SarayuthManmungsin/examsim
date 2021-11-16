import { NgModule } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { BaseTenantComponent } from '@app/modules/tenant/components/base/base-tenant.component';
import { TenantsComponent } from '@app/modules/tenant/components/tenants/tenants.component';
import { TenantRoutingModule } from '@app/modules/tenant/tenant.routes';
import { SidebarComponent } from '@app/modules/tenant/components/sidebars/sidebar.component';
import { CreateTenantSidebarComponent } from '@app/modules/tenant/components/sidebars/views/create-tenant-sidebar.component';

@NgModule({
    declarations: [
        BaseTenantComponent,
        TenantsComponent,
        SidebarComponent,
        CreateTenantSidebarComponent
    ],
    imports: [
        CoreModule,
        TenantRoutingModule
    ],
    providers: [

    ],
    exports: [
        TenantRoutingModule
    ]
})
export class TenantModule { }
