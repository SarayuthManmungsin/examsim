import { Injectable } from '@angular/core';
import { SystemMessageStatus } from '@app/models/system-messages/system-message-types';
import { SystemMessageModel } from '@app/models/system-messages/system-message.model';

@Injectable({
    providedIn: 'root',
})
export class SystemMessageService {

    private messageSender: (model: SystemMessageModel) => void;

    public showMessage(message: string, status: SystemMessageStatus) {
        if (this.messageSender) {
            this.messageSender(new SystemMessageModel({
                message: message,
                status: status
            }));
        }
    }

    /** Can subscribe once by system message component, so do not using this. */
    public watch(callback: (model: SystemMessageModel) => void) {
        if (this.messageSender) {
            throw new Error('Re-watch not allowed');
        } else {
            this.messageSender = callback;
        }
    }
}
