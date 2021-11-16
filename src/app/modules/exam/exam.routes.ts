import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '@app/modules/core/services/route-guard.service';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { BaseExamComponent } from './components/base/base-exam.component';
import { ExamsComponent } from './components/exams/exams.component';

const examRoutes: Routes = [
    {
        path: '',
        component: BaseExamComponent,
        children: [
            {
                path: '',
                component: ExamsComponent,
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
        RouterModule.forChild(examRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExamRoutingModule { }
