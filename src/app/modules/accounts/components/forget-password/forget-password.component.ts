import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { Router } from '@angular/router';
import { UserService } from '@app/modules/core/services/user.service';
import { ForgetPasswordModel } from '@app/models/accounts/forget-password.model';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';

@Component({
    selector: 'app-forget-password-component',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends BasePageComponent implements OnInit {

    public model = new ForgetPasswordModel();

    public disabled = false;

    public isLoad = false;

    constructor(public userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
        super(userService);
    }

    public ngOnInit() {
        this.model.email = this.authenticationService.getRecoveryEmail();
    }

    public onSubmit() {
        this.recovery();
    }

    public onKeyPress(event) {
        if (event.keyCode === 13) {
            this.onSubmit();
        }
    }

    public onBack() {
        this.router.navigate(['/account/login']);
    }

    private async recovery() {
        if (!this.model.isRecoveryModelValid()) {
            return;
        }
        this.loading();
        try {
            await this.userService.recoveryPassword(this.model);
            this.authenticationService.setRecoveryEmail(this.model.email);
            this.router.navigate(['/account/recovery-password']);
        } catch (e) {
            this.onError();
            throw e;
        }
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
