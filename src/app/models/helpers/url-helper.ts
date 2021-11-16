export class UrlHelper {

    static domain(): string {
        return location.protocol + '//' + location.host + '/';
    }

    static port(): string {
        return location.port;
    }

    static removeDomain(url: string): string {
        return url.replace(UrlHelper.domain(), '');
    }

    static loginUrl(): string {
        return '/account/login';
    }
}
