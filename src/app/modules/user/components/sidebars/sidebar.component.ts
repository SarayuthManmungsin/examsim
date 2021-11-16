import { Component } from '@angular/core';
import { UserService } from '@app/modules/core/services/user.service';
import { BaseSidebarComponent } from '@app/modules/core/components/bases/base-sidebar-component';
import { SidebarService } from '@app/modules/core/services/sidebar.service';

@Component({
    selector: 'app-sidebar-component',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseSidebarComponent {

    constructor(public userService: UserService, public sidebarService: SidebarService) {
        super(userService, sidebarService);
    }
}
