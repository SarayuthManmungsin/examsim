
export class Authentication {

    public static readonly GRANT_PASSWORD = 'password';
    public static readonly GRANT_REFRESH_TOKEN = 'refresh_token';
    public static readonly RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES = 10;

    public static getLoginData(username: string, password: string): object {
        return {
            username: username,
            password: password,
            grant_type: this.GRANT_PASSWORD
        };
    }

    public static getRefreshTokenData(refreshToken: string, username: string): object {
        return {
            refresh_token: refreshToken,
            username: username,
            grant_type: this.GRANT_REFRESH_TOKEN
        };
    }
}
