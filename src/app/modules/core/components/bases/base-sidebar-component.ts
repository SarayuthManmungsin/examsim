import { OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@app/modules/core/components/bases/base-component';
import { UserService } from '@app/modules/core/services/user.service';
import { SidebarService } from '@app/modules/core/services/sidebar.service';
import { SidebarModel } from '@app/models/sidebars/sidebar-model';
import { Strings } from '@app/configs/strings';

export class BaseSidebarComponent extends BaseComponent implements OnInit, OnDestroy {

    public model = new SidebarModel<any>();

    public active = false;

    public strings = Strings;

    private subscribeId: string;

    constructor(public userService: UserService, public sidebarService: SidebarService) {
        super(userService);
        this.subscribeId = sidebarService.subscribeOnOpenEvent((model: SidebarModel<any>) => {
            this.model = model;
            this.open();
        });
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        if (this.subscribeId) {
            this.sidebarService.unsubscribeOnOpenEvent(this.subscribeId);
        }
    }

    public open() {
        this.active = true;
    }

    public onSubmit() {
        if (this.model.onSubmit) {
            this.model.onSubmit((data: any) => {
                if (this.model.onSubmitted) {
                    this.model.onSubmitted(data);
                }
                this.onClose();
            });
        }
    }

    public onClose() {
        this.active = false;
        setTimeout(() => {
            this.model = new SidebarModel<any>();
        }, 500);
    }
}
