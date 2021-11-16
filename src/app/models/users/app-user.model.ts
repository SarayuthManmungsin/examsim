import { PermissionModel } from '@app/models/permissions/permissions.model';
import { PermissionHelper } from '@app/models/helpers/permission-helper';
import { PermissionRole } from '@app/models/permissions/permission-role.model';

export class AppUserModel {
    public id: string;
    public name: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public tenantId: string;
    public permissions: Array<PermissionModel> = [];

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    public getPermission(role: PermissionRole): PermissionModel {
        for (let i = 0; i < this.permissions.length; i++) {
            if (this.permissions[i].role === role) {
                return this.permissions[i];
            }
        }
        return new PermissionModel();
    }

    private cast(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.tenantId = data.tenantId;
        this.permissions = PermissionHelper.serializePermissions(data.permissions);
    }
}
