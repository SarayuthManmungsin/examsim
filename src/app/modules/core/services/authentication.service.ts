import { Injectable } from '@angular/core';
import { AppTokens, JwtToken } from '@app/models/authentications/access-token.model';
import { Authentication } from '@app/configs/authentication';
import { DateHelper } from '@app/models/helpers/date-helper';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private appTokens: AppTokens;

    private tokenStorageKey = 'authorization';

    private recoveryEmail: string;

    constructor() {
        this.loadTokens();
    }

    public saveToken(tokens: AppTokens) {
        this.appTokens = tokens;
        this.storeTokens();
    }

    public getAccessToken(): string {
        if (this.appTokens && this.appTokens.accessToken) {
            return this.appTokens.accessToken;
        }
        return '';
    }

    public getJwtToken(): JwtToken {
        if (this.appTokens && this.appTokens.jwtToken) {
            return this.appTokens.jwtToken;
        }
        return JwtToken.Empty();
    }
    public hasToken() {
        return !!this.appTokens;
    }

    public getTokenExpires(): Date {
        if (this.appTokens && this.appTokens.expiresIn) {
            return this.appTokens.expiresIn;
        }
        return null;
    }

    public isTokenExpired() {
        const expires = this.getTokenExpires();
        const date = new Date();
        return !expires || date >= expires;
    }

    public shouldRefreshToken() {
        if (this.isTokenExpired()) return true;
        let expiresAt = this.getTokenExpires();
        if (Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES > 0) {
            expiresAt = DateHelper.addMinutes(expiresAt, -Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES);
        }
        const date = new Date();
        return (expiresAt && date >= expiresAt);
    }

    public getRefreshToken(): string {
        if (this.appTokens && this.appTokens.refreshToken) {
            return this.appTokens.refreshToken;
        }
        return null;
    }

    public removeToken() {
        this.appTokens = null;
        localStorage.removeItem(this.tokenStorageKey);
    }

    public setRecoveryEmail(email: string) {
        this.recoveryEmail = email;
    }

    public getRecoveryEmail(): string {
        if (this.recoveryEmail) {
            return this.recoveryEmail;
        }
        return '';
    }

    private loadTokens() {
        if (!(localStorage && localStorage.getItem)) return;

        const tokensString = localStorage.getItem(this.tokenStorageKey);
        if (!tokensString) return;

        const tokens = tokensString.split(':');
        if (tokens.length !== 3) return;

        this.appTokens = new AppTokens({
            access_token: tokens[0],
            refresh_token: tokens[1]
        });
        this.appTokens.expiresIn = new Date(parseInt(tokens[2]));
    }

    private storeTokens() {
        if (localStorage && localStorage.setItem) {
            localStorage.setItem(
                this.tokenStorageKey,
                this.appTokens.accessToken + ':' + this.appTokens.refreshToken + ':' + this.appTokens.expiresIn.valueOf()
            );
        }
    }
}
