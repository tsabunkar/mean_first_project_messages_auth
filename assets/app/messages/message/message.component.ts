import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../models/message.model'
import { MessageService } from '../myservice/message.service';


@Component({
    selector: 'my-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    constructor(private messageService: MessageService) { }

    ngOnInit() {

    }

    mycolor: string = "lightblue";//using attribute directives

    @Input() msgObj: Message; //Using @Input() decorator, which tells that the value of msg will be passed from 
    //parentComponet(i.e-AppComponent) to childComponet(i.e-MessageComponent)

    //we can also specifiy input decorator as-
    // @Input('childObj') msgObj : Message
    //but, we shld have also change in app.component.html   <my-message [childObj]="messageObj"></my-message>


    @Output() editClicked = new EventEmitter<string>();

    onEdit() {
        this.editClicked.emit('A new value')
    }

    onDelete() {
        this.messageService.deletedMessage(this.msgObj)
    }
}