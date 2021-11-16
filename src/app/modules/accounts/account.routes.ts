import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/modules/accounts/components/login/login.component';
import { ForgetPasswordComponent } from '@app/modules/accounts/components/forget-password/forget-password.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { AccountComponent } from './components/account/account.component';

const accountRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'account',
        children: [
            {
                path: '',
                component: AccountComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'forget-password',
                component: ForgetPasswordComponent,
            },
            {
                path: 'recovery-password',
                component: RecoveryPasswordComponent,
            }
        ]
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(accountRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }
