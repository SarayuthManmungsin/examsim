import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { UserService } from '@app/modules/core/services/user.service';
import { PermissionHelper } from '@app/models/helpers/permission-helper';

@Injectable({
    providedIn: 'root',
})
export class RouteGuardService implements CanActivate {

    constructor(private router: Router, private userService: UserService) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree{
        const routePermissions = route.data.permissions;
        if (!routePermissions || routePermissions.length === 0) {
            return true;
        }
        const user = this.userService.getCurrentUserSync();
        if (!user) {
            console.log('no user account, redirecting to login');
            return this.router.createUrlTree(['/account/login']);
        }
        const hasPermission = PermissionHelper.hasPermission(user.permissions, routePermissions);

        if (!hasPermission) {
            console.log('user does not have permission, redirecting to login');
            return this.router.createUrlTree(['/account/login']);
        }

        return true;

    }
}
