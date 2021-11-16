import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '@app/models/navigation/menu-item';
import { UserService } from '@app/modules/core/services/user.service';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';
import { AppUserModel } from '@app/models/users/app-user.model';
import { PermissionHelper } from '@app/models/helpers/permission-helper';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { BaseComponent } from '@app/modules/core/components/bases/base-component';
import { Subscription } from 'rxjs';
import { VersionService } from "@app/modules/core/services/version.service";

@Component({
    selector: 'app-navigation-component',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends BaseComponent implements OnDestroy {

    public menuItems: Array<MenuItem> = [];

    public rightMenuItems: Array<MenuItem> = [];

    public user: AppUserModel;

    private onLoginSubscribe: Subscription;

    public version: string;

    constructor(public userService: UserService, private auth: AuthenticationService, private router: Router, versionService: VersionService) {
        super(userService);
        this.createMenu();
        this.onLoginSubscribe = this.userService.subscribeUserLogin(() => {
            this.user = this.userService.getCurrentUserSync();
            this.createMenu();
        });
        versionService.version().subscribe(value => this.version = value);
    }

    public ngOnDestroy() {
        if (this.onLoginSubscribe) {
            this.onLoginSubscribe.unsubscribe();
        }
    }

    public logout() {
        this.user = null;
        this.auth.removeToken();
        this.userService.removeUser();
        this.createMenu();
        this.router.navigate(['/account/login']);
    }

    private createMenu() {
        this.menuItems = [];

        const dashboard = new MenuItem({ text: 'Dashboard', url: '/', icon: 'fa-tachometer-alt' });
        // const users = new MenuItem({ text: 'Users', url: '/users', icon: 'fa-users' });
        // const tenants = new MenuItem({ text: 'Tenants', url: '/tenants', icon: 'fa-user-tie' });
        const accounts = new MenuItem({ text: 'Account', url: '#', icon: 'fa-user-circle', isAccount: true });
        const exams = new MenuItem({ text: 'Exams', url: '/exams', icon: 'fa fa-certificate' });

        if (this.user) {
            const tenantPermission = PermissionHelper.getUserPermission(this.user.permissions, PermissionRole.Tenants);
            const userPermission = PermissionHelper.getUserPermission(this.user.permissions, PermissionRole.Users);
            this.menuItems.push(dashboard);
            // if (userPermission.read) {
            //     this.menuItems.push(users);
            // }
            // if (tenantPermission.read) {
            //     this.menuItems.push(tenants);
            // }
        }
        this.menuItems.push(exams);

        this.rightMenuItems = [
            accounts
        ];
    }
}
