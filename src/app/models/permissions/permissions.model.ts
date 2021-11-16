import { PermissionRole } from '@app/models/permissions/permission-role.model';

export class PermissionModel {
    public role: PermissionRole;
    public read = false;
    public create = false;
    public update = false;
    public delete = false;

    constructor() {

    }
}
