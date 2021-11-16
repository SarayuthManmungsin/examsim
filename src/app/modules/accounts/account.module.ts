import { NgModule } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { AccountComponent } from './components/account/account.component';
import { AccountRoutingModule } from '@app/modules/accounts/account.routes';
import { LoginComponent } from '@app/modules/accounts/components/login/login.component';
import { ForgetPasswordComponent } from '@app/modules/accounts/components/forget-password/forget-password.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';

@NgModule({
    declarations: [
        AccountComponent,
        LoginComponent,
        ForgetPasswordComponent,
        RecoveryPasswordComponent
    ],
    imports: [
        CoreModule,
        AccountRoutingModule,
    ],
    providers: [

    ],
    exports: [
        AccountRoutingModule
    ]
})
export class AccountModule { }
