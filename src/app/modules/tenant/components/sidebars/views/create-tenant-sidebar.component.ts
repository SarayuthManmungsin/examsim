import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '@app/modules/core/services/user.service';
import {BaseSidebarViewComponent} from '@app/modules/core/components/bases/base-sidebar-view-component';
import {SidebarModel} from '@app/models/sidebars/sidebar-model';
import {TenantViewModel} from '@app/models/tenants/tenant-view.model';
import {TenantService} from '@app/modules/core/services/tenant.service';

@Component({
    selector: 'app-create-tenant-sidebar-component',
    templateUrl: './create-tenant-sidebar.component.html',
    styleUrls: ['./create-tenant-sidebar.component.scss']
})
export class CreateTenantSidebarComponent extends BaseSidebarViewComponent implements OnInit {

    @Input() sidebar: SidebarModel<TenantViewModel>;

    public model: TenantViewModel;

    constructor(public tenantService: TenantService, public userService: UserService) {
        super(userService);
    }

    public ngOnInit() {
        this.model = this.sidebar.model;
        this.sidebar.onSubmit = async (callback) => {
            const res = await this.createTenant();
            if (res) {
                callback(res);
            }
        };
        this.sidebar.onReady();
    }

    private async createTenant() {
        if (!this.model.isModelValid()) {
            return;
        }
        this.sidebar.loading();
        try {
            return await this.tenantService.create(this.model);
        } catch (err) {
            this.sidebar.onReady();
            throw err;
        }
    }
}
