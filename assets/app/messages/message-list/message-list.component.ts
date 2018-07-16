import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model'
import { MessageService } from '../myservice/message.service';

@Component({
    selector: 'my-message-list',
    templateUrl: `
    <div class="col-md-8 col-md-offset-2"> 
    <my-message [msgObj]="listOfmessage" (editClicked)="listOfmessage.content = $event" *ngFor="let listOfmessage of messageObj"></my-message>
    </div>
    `,
    // providers: [MessageService]//injecting service per component level
})

export class MessageListComponent implements OnInit {
    constructor(private messageService: MessageService) { }

    messageObj: Message[];

    //life-cycle hook of angular, this method will be invoked only when this component is initalized
    ngOnInit() {
       this.messageService.getMessages()
       .subscribe(
           (listOfmessages : Message[]) =>{
               this.messageObj = listOfmessages
           }
       )
        
     }

   /*  messageObj: Message[] = [
        new Message('Hi bro , wassup ?', 'Tejas'),
        new Message('I a mdoing well', 'Usha')
    ]; */
   

    editClicked(e) {
        console.log("edit btn is clicked");
    }
    //Message is DTO, above we are doing Constructor Injection


}