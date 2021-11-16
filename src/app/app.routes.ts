import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/modules/core/components/page-not-found/page-not-found.component';
import { HomeComponent } from '@app/modules/core/components/home/home.component';
import { PreloadAllModules } from '@angular/router';
import { RouteGuardService } from '@app/modules/core/services/route-guard.service';
import { RoutePermissionModel } from '@app/models/permissions/router-permission.model';
import { PermissionRole } from '@app/models/permissions/permission-role.model';
import { PermissionAction } from '@app/models/permissions/permission-action.model';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [
            RouteGuardService
        ],
        data: {
            permissions: [
                [new RoutePermissionModel({ permission: PermissionRole.Dashboard, actions: [PermissionAction.Read]})]
            ]
        }
    },
    {
        path: 'users',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'tenants',
        loadChildren: () => import('./modules/tenant/tenant.module').then(m => m.TenantModule)
    },
    {
        path: 'exams',
        loadChildren: () => import('./modules/exam/exam.module').then(m => m.ExamModule)
    },
    {
        path: 'examquestions',
        loadChildren: () => import('./modules/exam-question/exam-question.module').then(m => m.ExamQuestionModule)
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { preloadingStrategy: PreloadAllModules, enableTracing: false }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
