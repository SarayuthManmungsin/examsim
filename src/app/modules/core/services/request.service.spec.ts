import { SystemMessageService } from './system-message.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RequestService } from './request.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { environment } from '@environment';
import SpyObj = jasmine.SpyObj;
import { AuthenticationService } from './authentication.service';
import { Endpoints } from '@app/configs/endpoints';
import { AppTokens, JwtToken } from '@app/models/authentications/access-token.model';
import { Router } from '@angular/router';
import { RequestSettings } from '@app/models/requests/request-settings';
import { HttpErrorResponse} from '@angular/common/http';

describe('requestService', () => {
    const rejectSpy = jasmine.createSpy('onRejected');
    let messageServiceSpy: SpyObj<SystemMessageService>;
    let authServiceSpy: SpyObj<AuthenticationService>;
    let routerSpy: SpyObj<Router>;
    let requestService: RequestService;
    let httpController: HttpTestingController;
    const accessToken = 'myAccessToken';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RequestService,
                {
                    provide: SystemMessageService,
                    useValue: jasmine.createSpyObj('systemMessageService', ['showMessage'])
                },
                {
                    provide: AuthenticationService,
                    useValue: jasmine.createSpyObj('authService', [
                        'getTokenExpires',
                        'getRefreshToken',
                        'getAccessToken',
                        'saveToken',
                        'removeToken',
                        'shouldRefreshToken',
                        'hasToken',
                        'getJwtToken'
                    ])
                },
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('router', [
                        'navigate'
                    ])
                }
            ]
        });

        messageServiceSpy = TestBed.get(SystemMessageService);
        routerSpy = TestBed.get(Router);

        requestService = TestBed.get(RequestService);

        httpController = TestBed.get(HttpTestingController);

        authServiceSpy = TestBed.get(AuthenticationService);
        authServiceSpy.getAccessToken.and.returnValue(accessToken);
    });

    function makeRefreshResponse() {
        //replace with real token
        return {[AppTokens.ACCESS_TOKEN_KEY]: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'};
    }

    afterEach(() => {
        httpController.verify();
    });

    it('should prepend the url with the base url from environment', fakeAsync(() => {
        requestService.get('hello');
        tick();

        const testRequest = httpController.expectOne(environment.basePath + 'hello');
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush({});
    }));

    describe('access token', () => {
        it('should be in the auth header', fakeAsync(() => {
            requestService.get('hello');
            tick();

            const testRequest = httpController.expectOne(environment.basePath + 'hello');
            const headers = testRequest.request.headers;
            expect(headers.has('Authorization')).toBeTruthy();
            expect(headers.get('Authorization')).toContain(accessToken);
            testRequest.flush({});
        }));

        it(`should not be passed there isn't one`, fakeAsync(() => {
            authServiceSpy.getAccessToken.and.returnValue(null);

            requestService.get('hello');
            tick();

            const testRequest = httpController.expectOne(environment.basePath + 'hello');
            const headers = testRequest.request.headers;
            expect(headers.has('Authorization')).toBeFalsy();
            testRequest.flush({});
        }));
    });
    describe('refresh', () => {

        function dateOffsetBySeconds(seconds: number) {
            return new Date(new Date().valueOf() + (1000 * 60 * seconds));
        }

        const expectedRefreshToken = 'refreshWithMe';
        // date is one minute from now by default
        const refreshExpiresDate: Date = dateOffsetBySeconds(60);
        beforeEach(() => {
            authServiceSpy.getRefreshToken.and.returnValue(expectedRefreshToken);
            authServiceSpy.hasToken.and.returnValue(true);
            authServiceSpy.getTokenExpires.and.returnValue(refreshExpiresDate);
            authServiceSpy.shouldRefreshToken.and.returnValue(false);
            authServiceSpy.getJwtToken.and.returnValue(JwtToken.Empty());
        });
        it(`should not be called when the refresh token has not expired`, fakeAsync(() => {
            requestService.get('hello');
            tick();

            httpController.expectOne(environment.basePath + 'hello').flush({});
        }));

        it(`should be called when the refresh token has expired`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);

            requestService.get('hello');
            tick();

            const loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);
            expect(loginRequest.request.method).toBe('POST');
            expect(loginRequest.request.body).toEqual({
                refresh_token: expectedRefreshToken,
                grant_type: 'refresh_token',
                username: undefined//todo provide username for testing
            });
        }));

        it(`should only call refresh once even if there's 2 http requests`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);

            requestService.get('hello');
            requestService.get('hello');
            tick();


            let loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);
            httpController.expectNone(environment.basePath + 'hello');

            loginRequest.flush({});
            tick();
            httpController.match(environment.basePath + 'hello');
        }));

        it(`should only call the original request after it's done`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);

            requestService.get('hello');

            const loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);

            httpController.expectNone(environment.basePath + 'hello');
            loginRequest.flush({});
            tick();
            httpController.expectOne(environment.basePath + 'hello');
        }));

        //disabled for now, not sure if we want to do this
        xit(`should redirect to login on bad refresh token`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);
            requestService.get('hello').catch(() => {
            });
            tick();

            const loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);
            const error = {error_description: RequestService.INVALID_TOKEN_MESSAGE};
            loginRequest.flush(error, {status: 500, statusText: 'Server error, invalid token'});
            tick();
            expect(authServiceSpy.removeToken).toHaveBeenCalled();
            expect(routerSpy.navigate).toHaveBeenCalled();
        }));

        it(`should continue if there's a different error`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);
            requestService.get('hello').catch(() => {
            });
            tick();

            const loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);

            const error = {error_description: 'some other error message'};
            loginRequest.flush(error, {status: 500, statusText: 'Server error, invalid token'});
            tick();

            httpController.expectOne(environment.basePath + 'hello');
        }));

        it(`should use the response to set the new auth token`, fakeAsync(() => {
            authServiceSpy.shouldRefreshToken.and.returnValue(true);
            requestService.get('hello').catch(() => {
            });
            tick();

            const loginRequest = httpController.expectOne(environment.basePath + Endpoints.Login);
            let token = makeRefreshResponse();
            loginRequest.flush(token);
            tick();

            expect(authServiceSpy.saveToken).toHaveBeenCalledTimes(1);
            const newAppToken = <AppTokens>authServiceSpy.saveToken.calls.mostRecent().args[0];
            expect(newAppToken.accessToken).toBe(token[AppTokens.ACCESS_TOKEN_KEY]);

            httpController.expectOne(environment.basePath + 'hello');
        }));
    });

    describe('errors', () => {
        let testRequest: TestRequest;

        function setup(settings?: any) {
            requestService.get('hello', new RequestSettings(settings))
                .then(fail, (e) => {
                    console.log(e);
                    rejectSpy(e);
                });
            tick();

            testRequest = httpController.expectOne(environment.basePath + 'hello');
        }

        it('should send back an error response', fakeAsync(() => {
            setup();
            const errorResponse = {myError: 'oops'};
            testRequest.flush(errorResponse, {status: 500, statusText: 'server error'});
            tick(environment.lazyTimeMs + 5);

            expect(rejectSpy).toHaveBeenCalled();
            const callInfo = rejectSpy.calls.mostRecent();
            expect(callInfo.args[0].error).toBe(errorResponse);
        }));

        it(`should show errors to the user via the message service`, fakeAsync(() => {
            setup();
            testRequest.flush({}, {status: 500, statusText: 'server error'});
            tick();

            expect(messageServiceSpy.showMessage).toHaveBeenCalled();
        }));

        it('should use response errors for message', fakeAsync(() => {
            setup();
            const expectedError = 'This is my error';
            testRequest.flush({errors: [expectedError]}, {status: 500, statusText: 'server error'});
            tick();

            expect(messageServiceSpy.showMessage).toHaveBeenCalled();
            const callInfo = messageServiceSpy.showMessage.calls.mostRecent();
            expect(callInfo.args[0]).toContain(expectedError);
        }));

        it(`should show unknown error when that's the status`, fakeAsync(() => {
            setup();
            const expectedError = 'Unknown Error';

            testRequest.flush({errors: ['This is my error']}, {status: 500, statusText: expectedError});
            tick();

            expect(messageServiceSpy.showMessage).toHaveBeenCalled();
            const callInfo = messageServiceSpy.showMessage.calls.mostRecent();
            expect(callInfo.args[0]).toContain(expectedError);
        }));

        it('should send back the response for a custom error handler', fakeAsync(() => {
            setup({isCustomErrorHandle: true});
            const errorResponse = {myError: 'oops'};
            testRequest.flush(errorResponse, {status: 500, statusText: 'server error'});
            tick(environment.lazyTimeMs + 5);
            expect(rejectSpy).toHaveBeenCalled();
            const response: HttpErrorResponse = rejectSpy.calls.mostRecent().args[0];
            expect(response.url).toEqual('/api/v1/hello');
            expect(response.error).toEqual(jasmine.objectContaining(errorResponse));
        }));
    });
});
