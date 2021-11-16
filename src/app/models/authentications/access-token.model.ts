import { DateHelper } from '@app/models/helpers/date-helper';
import { Authentication } from '@app/configs/authentication';
import * as JwtDecode from 'jwt-decode';

export class AppTokens {
    public static ACCESS_TOKEN_KEY = 'access_token';
    public accessToken: string;
    public jwtToken: JwtToken;

    public refreshToken: string;
    public tokenType: string;

    public expiresIn: Date;

    constructor(data?: any) {
        this.accessToken = '';
        this.refreshToken = '';
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.accessToken = data[AppTokens.ACCESS_TOKEN_KEY];
        this.jwtToken = new JwtToken(this.accessToken);
        if ('refresh_token' in data) {
            this.refreshToken = data['refresh_token'];
        }
        if ('token_type' in data) {
            this.tokenType = data['token_type'];
        }
        if ('expires_in' in data) {
            this.expiresIn = DateHelper.addSeconds(new Date(), parseInt(data['expires_in']));
            if (Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES > 0) {
                this.expiresIn = DateHelper.addMinutes(this.expiresIn,
                    -Authentication.RENEW_TOKEN_BEFORE_EXPIRE_IN_MINUTES);
            }
        }
    }
}

export class JwtToken {
    private readonly rawString: string;
    private readonly jwtObject: any;

    public static Empty() {
        return new JwtToken('e30.e30');
    }

    constructor(tokenString: string) {
        this.rawString = tokenString;
        this.jwtObject = JwtDecode(tokenString);
    }

    get email(): string {
        return this.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    get userId(): string {
        return this.jwtObject['sub'];
    }

    get issuedAt(): Date {
        return new Date(this.jwtObject['iat']);
    }

    get expiresAt(): Date {
        return new Date(this.jwtObject['exp']);
    }

    public toString() {
        return this.rawString;
    }
}
