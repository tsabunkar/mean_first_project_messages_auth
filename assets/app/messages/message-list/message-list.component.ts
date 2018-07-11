import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model'

@Component({
    selector: 'my-message-list',
    templateUrl: `
    <div class="col-md-8 col-md-offset-2"> 
    <my-message [msgObj]="listOfmessage" (editClicked)="listOfmessage.content = $event" *ngFor="let listOfmessage of messageObj"></my-message>
    </div>
    `
})

export class MessageListComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    messageObj: Message[] = [
        new Message('Hi bro , wassup ?', 'Tejas'),
        new Message('I a mdoing well', 'Usha')
    ];

    editClicked(e) {
        console.log("edit btn is clicked");
    }
    //Message is DTO, above we are doing Constructor Injection
}