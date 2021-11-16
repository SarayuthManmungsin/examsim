import { PermissionModel } from '@app/models/permissions/permissions.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';

export class PermissionHelper {

    public static getUserPermission(userPermissions: Array<PermissionModel>, role: PermissionRole): PermissionModel {

        for (let i = 0; i < userPermissions.length; i++) {
            if (userPermissions[i].role === role) {
                return userPermissions[i];
            }
        }

        return new PermissionModel();
    }

    public static hasPermission(userPermissions: Array<PermissionModel>, routePermissions: Array<Array<RoutePermissionModel>>): boolean {
        for (let i = 0; i < routePermissions.length; i++) {
            let allMatches = true;
            for (let j = 0; j < routePermissions[i].length; j++) {
                const routePermission = routePermissions[i][j];
                const matchUserPermission = PermissionHelper.getUserPermissionsMatchesRoutePermission(userPermissions, routePermission);
                if (!matchUserPermission) {
                    allMatches = false;
                    break;
                }
            }
            if (allMatches) {
                return true;
            }
        }

        return false;
    }

    public static serializePermissions(data: any): Array<PermissionModel> {
        const permissions = [];
        Object.keys(PermissionRole).filter(key => {
            const permission = PermissionHelper.createPermissionModel(data, key);
            if (permission) {
                permissions.push(permission);
            }
        });

        return permissions;
    }

    private static getUserPermissionsMatchesRoutePermission(
        userPermissions: Array<PermissionModel>,
        routePermission: RoutePermissionModel
    ): PermissionModel {
        for (let i = 0; i < userPermissions.length; i++) {
            if (userPermissions[i].role === routePermission.permission) {
                let allMatches = true;
                if (routePermission.actions && routePermission.actions.length) {
                    for (let j = 0; j < routePermission.actions.length; j++) {
                        if (routePermission.actions[j] === PermissionAction.Read && !userPermissions[i].read) {
                            allMatches = false;
                            break;
                        } else if (routePermission.actions[j] === PermissionAction.Create && !userPermissions[i].create) {
                            allMatches = false;
                            break;
                        } else if (routePermission.actions[j] === PermissionAction.Update && !userPermissions[i].update) {
                            allMatches = false;
                            break;
                        } else if (routePermission.actions[j] === PermissionAction.Delete && !userPermissions[i].delete) {
                            allMatches = false;
                            break;
                        }
                    }
                }
                if (allMatches) {
                    return userPermissions[i];
                }
            }
        }
        return null;
    }

    private static createPermissionModel(data: any, key: string): PermissionModel {
        const permission = new PermissionModel();
        if (key === 'Dashboard') {
            permission.role = PermissionRole.Dashboard;
            permission.delete = true;
            permission.create = true;
            permission.update = true;
            permission.read = true;
            return permission;
        } else if (data['canManage' + key] || data['canRead' + key]) {
            permission.role = PermissionRole[key];
            if (data['canManage' + key]) {
                permission.create = true;
                permission.update = true;
                permission.delete = true;
            }
            if (data['canRead' + key]) {
                permission.read = true;
            }
            return permission;
        }

        return null;
    }
}
