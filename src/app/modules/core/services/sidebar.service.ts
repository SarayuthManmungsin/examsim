import { Injectable } from '@angular/core';
import { SidebarModel } from '@app/models/sidebars/sidebar-model';
import { StringHelper } from '@app/models/helpers/string-helper';

@Injectable({
    providedIn: 'root',
})

export class SidebarService {

    private onOpenSidebarCall: (model: SidebarModel<any>) => void;
    private subscribeId: string;

    public open(model: SidebarModel<any>) {
        this.onOpenSidebarCall(model);
    }

    /** Can subscribe once by sidebar component, so do not using this. */
    public subscribeOnOpenEvent(callback): string {
        if (!this.onOpenSidebarCall) {
            this.onOpenSidebarCall = callback;
        } else {
            throw new Error('sidebar on open event, re-assign not allowed');
        }
        this.subscribeId = StringHelper.randomString();
        return this.subscribeId;
    }

    /** Can unsubscribe by sidebar component, so do not using this. */
    public unsubscribeOnOpenEvent(id) {
        if (this.subscribeId === id) {
            this.onOpenSidebarCall = null;
        } else {
            throw new Error('Can not unsubscribe because Id is invalid');
        }
    }
}
