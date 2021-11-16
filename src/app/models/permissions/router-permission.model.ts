import { PermissionAction } from '@app/models/permissions/permission-action.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';

export class RoutePermissionModel {
    public permission: PermissionRole;
    public actions: Array<PermissionAction> = [];

    constructor(data: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.permission = data.permission;
        this.actions = data.actions;
    }
}
