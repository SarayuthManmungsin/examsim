import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '@app/modules/core/services/route-guard.service';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { BaseExamQuestionComponent } from './components/base/base-exam-question.component';
import { ExamQuestionsComponent } from './components/exam-questions/exam-questions.component';

const examQuestionRoutes: Routes = [
    {
        path: '',
        component: BaseExamQuestionComponent,
        children: [
            {
                path: '',
                component: ExamQuestionsComponent,
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
        RouterModule.forChild(examQuestionRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExamQuestionRoutingModule { }
