import { Component } from '@angular/core';
import { HubConnection } from "@aspnet/signalr-client";

@Component({
    selector: 'servermessage',
    templateUrl: './servermessage.component.html'
})
export class ServerMessageComponent {
    public currentMessage = "No messages recieved";
    private notificationsHub: HubConnection;

    public constructor() {
        this.notificationsHub = new HubConnection("/CommunicationHub");

        //this.notificationsHub.on("ServerMessage", (message) => {
        //    this.currentMessage = message;
        //});

        this.notificationsHub.start();
    }
}
