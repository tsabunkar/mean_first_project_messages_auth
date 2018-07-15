import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../myservice/message.service';
import { NgForm } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';


@Component({
    selector: 'my-message-input',
    templateUrl: './message-input.component.html',
    // providers: [MessageService]//we will mention all the services name we r injecting into this component, and thus
    //it will create the instances for this service
})

export class MessageInputComponent implements OnInit {
    //injecting the service(i.e-messageService) into this component(i.e-MessageInputComponent)
    constructor(private messageService: MessageService) { }//this is-> injecting service PER COMPONENT LEVEL

    ngOnInit() { }
    /*  onSave(inputTextValue: string) {
         console.log(inputTextValue);
         // message : new Message(); //we will not instantiate the message using new keyword but rather will
         //be injecting the message instance from message.service.ts
 
         const message = new Message(inputTextValue, "Admin");
         this.messageService.addMessage(message)
         // console.log(this.messageService.getMessages());
     } */
    onSubmitOfForm(myform: NgForm) {
        // console.log(myform);
        // console.log(myform.value.contentName);
        const message = new Message(myform.value.contentName, "Admin");

        const ObservableObj: Observable<Message> = this.messageService.addMessage(message);
        ObservableObj.subscribe(
            (mess: Message) => {
                console.log(mess);
            },
            err => { console.log(err); },

        )

        myform.resetForm();//reseting all the form fields like -> clearing the input text box, clearning check box,etc
    }
}