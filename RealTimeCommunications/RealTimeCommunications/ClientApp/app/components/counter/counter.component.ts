import { Component } from '@angular/core';
import { HubConnection } from "@aspnet/signalr-client";

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;
    private notificationsHub: HubConnection;

    public constructor() {
        this.notificationsHub = new HubConnection("/CommunicationHub");
        this.notificationsHub.start();
    }

    public incrementCounter() {
        this.currentCount++;
        //this.notificationsHub.invoke("SendMessageServer", this.currentCount);
    }
}
