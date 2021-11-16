import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {Component} from '@angular/core';
import {Strings} from '@app/configs/strings';
import {FormsModule} from '@angular/forms';
import {UserService} from '@app/modules/core/services/user.service';
import {RequestService} from '@app/modules/core/services/request.service';
import {AuthenticationService} from '@app/modules/core/services/authentication.service';
import {Router} from '@angular/router';

@Component({selector: 'app-spinner-component', template: ''})
class AppSpinnerStubComponent {
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let h1: HTMLElement;


    beforeEach(async(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                LoginComponent,
                AppSpinnerStubComponent
            ],
            providers: [
                {provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getCurrentUserSync', 'subscribeUserLogin'])},
                {provide: RequestService, value: {}},
                {provide: AuthenticationService, value: {}},
                {provide: Router, value: {}},
            ]
        }).compileComponents();

        userServiceSpy = TestBed.get(UserService);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
    }));

    it('should have the app title in an h1', () => {
        expect(h1.textContent).toEqual('');
        fixture.detectChanges();
        expect(h1.textContent).toContain(Strings.LOGIN);
    });
});
