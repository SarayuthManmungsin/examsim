import { Component } from '@angular/core';
import { SystemMessageModel } from '@app/models/system-messages/system-message.model';
import { SystemMessageService } from '@app/modules/core/services/system-message.service';

@Component({
    selector: 'app-system-message-component',
    templateUrl: './system-message.component.html',
    styleUrls: ['./system-message.component.scss']
})
export class SystemMessageComponent {

    public messages: Array<SystemMessageModel> = [];

    constructor(private systemMessageService: SystemMessageService) {
        this.initEventListener();
    }

    public removeMessage(index: number) {
        const message = this.messages[index];
        clearTimeout(message.timer);
        message.position = -300;
        setTimeout(() => {
            this.messages.splice(index, 1);
            this.updatePosition();
        }, 500);
    }

    private initEventListener() {
        this.systemMessageService.watch((message: SystemMessageModel) => {
            this.queueMessage(message);
        });
    }

    private queueMessage(message: SystemMessageModel) {
        this.messages.push(message);
        setTimeout(() => {
            message.timer = setInterval(() => {
                if (message.timing > 0) {
                    message.timing--;
                } else {
                    this.removeMessage(message.queue);
                }
                console.log('timer is running');
            }, 1000);
            this.updatePosition();
        }, 500);
    }

    private updatePosition() {
        const minPosition = 8;
        const messageHeight = 60;
        for (let i = 0; i < this.messages.length; i++) {
            this.messages[i].queue = i;
            this.messages[i].position = minPosition + (messageHeight * i);
        }
    }
}
