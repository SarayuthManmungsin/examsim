import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CoreModule } from '@app/modules/core/core.module';
import { AccountModule } from '@app/modules/accounts/account.module';
import { AppRoutingModule } from '@app/app.routes';
import { AppComponent } from './app.component';
import { UserService } from '@app/modules/core/services/user.service';
import { AuthenticationService } from './modules/core/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

export function doAuthentication(userService: UserService, auth: AuthenticationService) {
    return () => auth.hasToken() ? userService.getCurrentUserAsyncIgnore401() : Promise.resolve();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [        
        BrowserAnimationsModule,
        CoreModule,
        AccountModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: doAuthentication,
            deps: [UserService, AuthenticationService],
            multi: true
        },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
