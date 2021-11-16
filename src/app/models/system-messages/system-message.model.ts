import { SystemMessageStatus } from '@app/models/system-messages/system-message-types';

export class SystemMessageModel {
    public message: string;
    public status: SystemMessageStatus;
    public position: number;
    public timing: number;
    public timer: any;
    public queue: number;
    private defaultPosition = -300;

    constructor(data?: any) {
        this.message = '';
        this.position = this.defaultPosition;
        this.timing = 5;

        if (data) {
            this.cast(data);
        }
    }

    public resetPosition() {
        this.position = this.defaultPosition;
    }

    private cast(data: any) {
        this.message = data.message;
        this.status = data.status;
    }
}
