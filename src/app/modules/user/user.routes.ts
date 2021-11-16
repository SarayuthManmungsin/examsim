import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '@app/modules/core/services/route-guard.service';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { BaseUserComponent } from '@app/modules/user/components/base/base-user.component';
import { UsersComponent } from '@app/modules/user/components/users/users.component';

const userRoutes: Routes = [
    {
        path: '',
        component: BaseUserComponent,
        children: [
            {
                path: '',
                component: UsersComponent,
                canActivate: [
                    RouteGuardService
                ],
                data: {
                    permissions: [
                        [new RoutePermissionModel({ permission: PermissionRole.Users, actions: [PermissionAction.Read] })]
                    ]
                }
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
