import { Component, OnInit, Input } from '@angular/core';

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




    onEdit() {
        this.messageService.editMessage(this.msgObj)
    }

    onDelete() {
        this.messageService.deletedMessage(this.msgObj)
            .subscribe(
                result => {
                    console.log(result);
                },
                err => { console.log(err); }
            )
    }

    belongsToUser() {
        return localStorage.getItem('myuserId') == this.msgObj.userId
        //return true, if user_ObjectId is same as current msgObject userId property
    }
}