import { BaseComponent } from '@app/modules/core/components/bases/base-component';
import { UserService } from '@app/modules/core/services/user.service';

export class BasePageComponent extends BaseComponent {

    constructor(public userService: UserService) {
        super(userService);
    }
}
