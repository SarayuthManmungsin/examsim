import { Injectable } from '@angular/core';
import { RequestService } from '@app/modules/core/services/request.service';
import { UserViewModel } from '@app/models/users/user-view.model';
import { Endpoints } from '@app/configs/endpoints';
import { AppUserModel } from '@app/models/users/app-user.model';
import { RequestSettings } from '@app/models/requests/request-settings';
import { BaseService } from '@app/modules/core/services/base.service';
import { IService } from '@app/modules/core/services/interface.service';
import { ServiceEndpoints } from '@app/models/endpoints/service-endpoints.model';
import { ForgetPasswordModel } from '@app/models/accounts/forget-password.model';
import { RecoveryPasswordModel } from '@app/models/accounts/recovery-password.model';
import { AccountModel } from '@app/models/accounts/account-model';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: "root"
})
export class UserService extends BaseService<UserViewModel> implements IService<UserViewModel> {

    private user: AppUserModel;

    private onLoginSubject = new Subject<void>();

    constructor(public request: RequestService, private authService: AuthenticationService) {
        super(request, new ServiceEndpoints({
            get: '',
            getAll: Endpoints.GetAllUsers,
            create: Endpoints.CreateUser,
            update: Endpoints.UpdateUser,
            delete: '',
        }), UserViewModel.makeList);

    }

    public updateUser(model: AccountModel): Promise<any> {
        return this.request.patch(this.endpoints.update, model, new RequestSettings({isCustomErrorHandle: true}));
    }

    async getCurrentUserAsync(): Promise<AppUserModel> {
        const res = await this.request.get(Endpoints.GetCurrentUser,
            new RequestSettings({isCustomErrorHandle: true}
            ));
        this.user = new AppUserModel(res);
        this.broadcastOnLogin();
        return this.user;
    }

    async getCurrentUserAsyncIgnore401() {
        try {
            await this.getCurrentUserAsync();
        } catch (e) {
            if (e.status == 401) {
                this.removeUser();
                this.authService.removeToken();
                //swallow 401 errors
                return;
            }
            throw e;
        }
    }


    public recoveryPassword(model: ForgetPasswordModel) {
        return this.request.post(Endpoints.RecoveryPassword, model);
    }

    public resetPassword(model: RecoveryPasswordModel) {
        return this.request.post(Endpoints.ResetPassword, model);
    }

    public getCurrentUserSync(): AppUserModel {
        return this.user;
    }

    public removeUser() {
        this.user = null;
    }

    public subscribeUserLogin(callback: () => void) {
        return this.onLoginSubject.subscribe(value => callback());
    }

    private broadcastOnLogin() {
        this.onLoginSubject.next();
    }
}
