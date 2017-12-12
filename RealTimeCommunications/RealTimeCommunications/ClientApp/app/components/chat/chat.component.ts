import { Component } from '@angular/core';
import { HubConnection } from "@aspnet/signalr-client";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent {
    public currentMessage = "No messages recieved";
    private notificationsHub: HubConnection;
    public messages: string[];
    public newMessage = "";

    public constructor() {
        this.notificationsHub = new HubConnection("/CommunicationHub");
        this.messages = new Array<string>();
        this.messages.push(btoa("Welcome to chat!"));

        //this.notificationsHub.on("ChatMessage", (message) => {
        //    this.messages.push(message);
        //});

        this.notificationsHub.start();
    }

    public sendMessage() {
        if (!this.newMessage || this.newMessage === "" || this.newMessage.trim() === "") {
            this.newMessage = "";
            return;
        }
        this.notificationsHub.invoke("ChatMessage", /*btoa(*/this.newMessage/*)*/);
        this.newMessage = "";
    }

    public clearHistory() {
        this.messages = new Array<string>();
    }

    public decodeMsg(message: string) {
        return atob(message);
    }
}
