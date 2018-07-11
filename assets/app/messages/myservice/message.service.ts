import { Injectable } from '@angular/core';
import { Message } from '../models/message.model'

@Injectable()
export class MessageService {
    constructor() { }

    private messageList: Message[] = [];

    addMessage(message: Message) {
        this.messageList.push(message);
        // console.log(this.messageList);
    }
    getMessages() {
        return this.messageList;
    }

    deletedMessage(message: Message) {
        this.messageList.splice(this.messageList.indexOf(message), 1);//removing one element from the messageList array
    }
}