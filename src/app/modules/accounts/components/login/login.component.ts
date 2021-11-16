import { Component } from '@angular/core';
import { LoginModel } from '@app/models/accounts/login.model';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { RequestService } from '@app/modules/core/services/request.service';
import { Endpoints } from '@app/configs/endpoints';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';
import { AppTokens } from '@app/models/authentications/access-token.model';
import { Router } from '@angular/router';
import { UserService } from '@app/modules/core/services/user.service';
import { Authentication } from '@app/configs/authentication';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent {

    public model = new LoginModel();

    public disabled = false;

    public isLoad = false;

    constructor(
        public userService: UserService,
        private request: RequestService,
        private auth: AuthenticationService,
        private router: Router
    ) {
        super(userService);
    }

    public async onLogin() {
        if (!this.model.isModelValid()) return;

        this.loading();
        let loginData = Authentication.getLoginData(this.model.username, this.model.password);
        try {
            let res = await this.request.post(Endpoints.Login, loginData);
            const tokens = new AppTokens(res);
            this.auth.saveToken(tokens);
            await this.getUserInfo();
            await this.router.navigate(['/']);
        } catch (err) {
            this.onError();
            throw err;
        }
    }

    private getUserInfo() {
        return this.userService.getCurrentUserAsync();
    }

    private loading() {
        this.model.isFail = false;
        this.isLoad = true;
        this.disableForm();
    }

    private onError() {
        this.model.isFail = true;
        this.enableFrom();
    }

    private disableForm() {
        this.disabled = true;
    }

    private enableFrom() {
        this.isLoad = false;
        this.disabled = false;
    }
}
