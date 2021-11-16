import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { OnInit } from '@angular/core';
import { UserService } from '@app/modules/core/services/user.service';
import { UserViewModel } from '@app/models/users/user-view.model';
import { TableModel } from '@app/models/table/table.model';
import { SidebarService } from '@app/modules/core/services/sidebar.service';
import { SidebarModel } from '@app/models/sidebars/sidebar-model';
import { SidebarView } from '@app/models/sidebars/sidebar-view';
import { TableHelper } from '@app/models/helpers/table-helper';

@Component({
    selector: 'app-users-component',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasePageComponent implements OnInit {

    public table = new TableModel();

    constructor(public userService: UserService, private sidebar: SidebarService) {
        super(userService);
    }

    public ngOnInit() {
        this.createTable();
    }

    public create() {
        this.sidebar.open(new SidebarModel<UserViewModel>({
            title: this.strings.CREATE_USER,
            model: new UserViewModel(),
            view: SidebarView.CREATE_USER,
            onSubmitted: (model: UserViewModel) => {
                this.table.reload();
            }
        }));
    }

    private createTable() {
        this.table = TableHelper.userTable();
    }
}
