import { NgModule } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { UserRoutingModule } from '@app/modules/user/user.routes';
import { BaseUserComponent } from '@app/modules/user/components/base/base-user.component';
import { SidebarComponent } from '@app/modules/user/components/sidebars/sidebar.component';
import { CreateUserSidebarComponent } from '@app/modules/user/components/sidebars/views/create-user-sidebar.component';
import { UsersComponent } from '@app/modules/user/components/users/users.component';

@NgModule({
    declarations: [
        BaseUserComponent,
        UsersComponent,
        SidebarComponent,
        CreateUserSidebarComponent
    ],
    imports: [
        CoreModule,
        UserRoutingModule,
    ],
    providers: [

    ],
    exports: [
        UserRoutingModule
    ]
})
export class UserModule { }
