import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/modules/core/services/user.service';
import {Input} from '@angular/core';
import {UserViewModel} from '@app/models/users/user-view.model';
import {BaseSidebarViewComponent} from '@app/modules/core/components/bases/base-sidebar-view-component';
import {SidebarModel} from '@app/models/sidebars/sidebar-model';
import {Endpoints} from '@app/configs/endpoints';
import {PermissionRole} from '@app/models/permissions/permission-role.model';
import {PermissionModel} from '@app/models/permissions/permissions.model';

@Component({
    selector: 'app-create-user-sidebar-component',
    templateUrl: './create-user-sidebar.component.html',
    styleUrls: ['./create-user-sidebar.component.scss']
})
export class CreateUserSidebarComponent extends BaseSidebarViewComponent implements OnInit {

    @Input() sidebar: SidebarModel<UserViewModel>;

    public model: UserViewModel;

    public tenantPermission: PermissionModel;

    public tenantOptionsUrl = Endpoints.GetAllTenantOptions;

    constructor(public userService: UserService) {
        super(userService);
    }

    public ngOnInit() {
        this.model = this.sidebar.model;
        this.sidebar.onSubmit = async (callback) => {
            const res = await this.createUser();
            if (res) {
                callback(res);
            }
        };
        this.initModel();
        this.sidebar.onReady();
    }

    private initModel() {
        this.tenantPermission = this.user.getPermission(PermissionRole.Tenants);
        if (!this.tenantPermission || !this.tenantPermission.read) {
            this.model.tenantID = this.user.tenantId;
        }
    }

    private async createUser() {
        if (!this.model.isModelValid()) {
            return;
        }
        this.sidebar.loading();
        try {
            return await this.userService.create(this.model);
        } catch (err) {

            if (err && err.length && err[0].indexOf(this.model.email)) {
                this.model.resetModelState();
                this.model.isUsernameUnique = false;
            }
            this.sidebar.onReady();
            throw err;
        }
    }
}
