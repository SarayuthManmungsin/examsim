import { UserService } from './user.service';
import { RequestService } from './request.service';
import SpyObj = jasmine.SpyObj;
import Spy = jasmine.Spy;
import { StringHelper } from '@app/models/helpers/string-helper';
import { async } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('UserService', () => {
    let service: UserService;
    let requestService: SpyObj<RequestService>;
    let authService: SpyObj<AuthenticationService>;
    beforeEach(() => {
        requestService = jasmine.createSpyObj('requestService', ['get']);
        authService = jasmine.createSpyObj('authService', ['removeToken']);
        service = new UserService(requestService, authService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Subscribe login', () => {
        let subscribeSpy: Spy;
        let userId: string;
        let actualUserId: string;
        beforeEach(() => {
            subscribeSpy = jasmine.createSpy('sub');
            userId = StringHelper.randomString();
        });

        async function mockLogin() {
            requestService.get.and.returnValue(Promise.resolve({id: userId, permissions: {}}));
            const user = await service.getCurrentUserAsync();
            actualUserId = user.id;
        }

        it('should notify on login', async(async () => {
            service.subscribeUserLogin(subscribeSpy);
            await mockLogin();
            expect(subscribeSpy).toHaveBeenCalled();
        }));

        it('should work with no subscribers', async(async () => {
            await mockLogin();
            expect(actualUserId).toBe(userId);
        }));

        it('should no longer notify if unsubscribed', async(async () => {
            const sub = service.subscribeUserLogin(subscribeSpy);
            sub.unsubscribe();
            await mockLogin();
            expect(subscribeSpy).not.toHaveBeenCalled();

        }));
    });
});
