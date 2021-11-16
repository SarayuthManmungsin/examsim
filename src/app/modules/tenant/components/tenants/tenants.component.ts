import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { OnInit } from '@angular/core';
import { UserService } from '@app/modules/core/services/user.service';
import { TableModel } from '@app/models/table/table.model';
import { TableHelper } from '@app/models/helpers/table-helper';
import { TenantViewModel } from '@app/models/tenants/tenant-view.model';
import { SidebarService } from '@app/modules/core/services/sidebar.service';
import { SidebarModel } from '@app/models/sidebars/sidebar-model';
import { SidebarView } from '@app/models/sidebars/sidebar-view';

@Component({
    selector: 'app-tenants-component',
    templateUrl: './tenants.component.html',
    styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent extends BasePageComponent implements OnInit {

    public table = new TableModel();

    constructor(public userService: UserService, private sidebar: SidebarService) {
        super(userService);
    }

    public ngOnInit() {
        this.createTable();
    }

    public create() {
        this.sidebar.open(new SidebarModel<TenantViewModel>({
            title: this.strings.CREATE_TENANT,
            model: new TenantViewModel(),
            view: SidebarView.CREATE_TENANT,
            onSubmitted: (model: TenantViewModel) => {
                this.table.reload();
            }
        }));
    }

    private createTable() {
        this.table = TableHelper.tenantTable();
    }
}
