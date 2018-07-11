import { Component, OnInit, Input } from '@angular/core';

import { Message } from './models/message.model'
@Component({
    selector: 'my-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    mycolor : string = "red";//using attribute directives

    @Input() msgObj: Message; //Using @Input() decorator, which tells that the value of msg will be passed from 
    //parentComponet(i.e-AppComponent) to childComponet(i.e-MessageComponent)

    //we can also specifiy input decorator as-
    // @Input('childObj') msgObj : Message
    //but, we shld have also change in app.component.html   <my-message [childObj]="messageObj"></my-message>

}