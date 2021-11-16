import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { UserService } from '@app/modules/core/services/user.service';

@Component({
    selector: 'app-base-tenant-component',
    templateUrl: './base-tenant.component.html',
    styleUrls: ['./base-tenant.component.scss']
})
export class BaseTenantComponent extends BasePageComponent {

    constructor(public userService: UserService) {
        super(userService);
    }
}
