import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { RequestSettings } from '@app/models/requests/request-settings';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';
import { SystemMessageService } from '@app/modules/core/services/system-message.service';
import { SystemMessageStatus } from '@app/models/system-messages/system-message-types';
import { Endpoints } from '@app/configs/endpoints';
import { AppTokens } from '@app/models/authentications/access-token.model';
import { Authentication } from '@app/configs/authentication';
import { Strings } from '@app/configs/strings';
import { UrlHelper } from '@app/models/helpers/url-helper';
import { APIResponseWrapper } from '@app/models/responses/api-response-wrapper';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    public static readonly INVALID_TOKEN_MESSAGE = 'The specified refresh token is invalid.';

    private baseUrl: string;
    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private messageService: SystemMessageService,
        private injector: Injector
    ) {
        this.baseUrl = environment.basePath;
    }

    public async get<T = APIResponseWrapper>(url: string, settings?: RequestSettings): Promise<T> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.get<T>(requestUrl, this.getRequestOptions()),
            settings
        );
    }

    public async post<T = APIResponseWrapper>(url: string, data: any, settings?: RequestSettings): Promise<T> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.post<T>(requestUrl,
                data,
                this.getRequestOptions()),
            settings
        );
    }

    async formPost(url: string, data: URLSearchParams, settings?: RequestSettings): Promise<any> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.post<APIResponseWrapper>(requestUrl, data.toString(), this.getFormOptions()),
            settings
        );
    }

    async patch<T = APIResponseWrapper>(url: string, data: any, settings?: RequestSettings): Promise<T> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.patch<T>(requestUrl,
                data,
                this.getRequestOptions()),
            settings
        );

    }

    async put<T = APIResponseWrapper>(url: string, data: any, settings?: RequestSettings): Promise<T> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.put<T>(requestUrl,
                data,
                this.getRequestOptions()),
            settings
        );
    }

    async delete<T = APIResponseWrapper>(url: string, settings?: RequestSettings): Promise<T> {
        await this.beginRequest();
        let requestUrl = this.baseUrl + url;
        return this.doRequest
        (
            () => this.http.delete<T>(requestUrl, this.getRequestOptions()),
            settings
        );
    }

    private beginRequest() {
        if (this.auth.hasToken() && this.auth.shouldRefreshToken())
            return this.refreshToken();
    }

    private async doRequest<T>(execute: () => Observable<T>, settings: RequestSettings) {
        if (!settings) settings = new RequestSettings();
        let result: T;
        try {
            result = await execute().toPromise();
        } catch (err) {
            let retry = await this.onError(err, settings);
            if (retry) {
                try {
                    result = await execute().toPromise();
                } catch {
                    //ignore and process the original error
                }
            }
            if (!result)
                throw err;

        }
        return result;
    }

    //we need to do this just in case we call a bunch of http requests
    //they would all try to refresh at the same time, which would fail for
    //all requests after the first one
    private pendingRefresh: Promise<boolean>;

    public async refreshToken(): Promise<boolean> {
        if (this.pendingRefresh) return await this.pendingRefresh;
        const refreshToken = this.auth.getRefreshToken();
        if (!refreshToken) return false;

        this.pendingRefresh = executeRefreshToken(this);
        let result = await this.pendingRefresh;
        this.pendingRefresh = null;
        return result;

        async function executeRefreshToken(req: RequestService) {
            const refreshToken = req.auth.getRefreshToken();
            let username = req.auth.getJwtToken().email;
            const options = req.getRequestOptions();
            const data = Authentication.getRefreshTokenData(refreshToken, username);
            try {
                const res = await req.http.post(req.baseUrl + Endpoints.Login, data, options)
                    .toPromise();
                const tokens = new AppTokens(res);
                req.auth.saveToken(tokens);
                return true;
            } catch (e) {
                req.auth.removeToken();
                return false;
            }
        }
    }



    private async onError(err: any, settings?: RequestSettings): Promise<boolean> {
        if ((err instanceof HttpErrorResponse)
            && err.status == 401) {
            if (settings.retryOn401 && await this.refreshToken()) {
                return true;
            }

            this.redirectToLogin();
        }
        if (settings.isCustomErrorHandle) {
            throw err;
        } else {
            this.errorHandler(err);
        }
        return false;
    }

    private errorHandler(response: any): void {
        // TODO: Handle global error response
        let errorResponseObject = response;
        if (response.statusText === 'Unknown Error') {
            this.messageService.showMessage(response.statusText, SystemMessageStatus.Danger);
        } else {
            errorResponseObject = this.extractErrorBody(response);
            if (errorResponseObject && errorResponseObject.length) {
                const message = errorResponseObject.join(',');
                this.messageService.showMessage(message, SystemMessageStatus.Danger);
            } else {
                errorResponseObject = response;
                this.messageService.showMessage(Strings.GENERAL_REQUEST_ERROR, SystemMessageStatus.Danger);
            }
        }

        throw errorResponseObject;
    }

    private extractErrorBody(res: any): Array<any> {
        if (res.error && res.error.errors) {
            return res.error.errors;
        }
        return null;
    }

    private redirectToLogin() {
        this.auth.removeToken();
        this.injector.get(Router).navigate([UrlHelper.loginUrl()]);
    }

    private getRequestOptions(): { headers: HttpHeaders } {
        const httpOptions = {
            headers: new HttpHeaders()
        };
        const token = this.auth.getAccessToken();
        if (token) {
            httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
        }
        return httpOptions;
    }

    private getFormOptions(): { headers: HttpHeaders } {
        const httpOptions = {
            headers: new HttpHeaders()
        };
        const token = this.auth.getAccessToken();
        if (token) {
            httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
        }
        return httpOptions;
    }
}
