import { Component } from '@angular/core';
import { MessageService } from './messages/myservice/message.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]//injecting service to this parent component which will make this service
    //inherit/avaiable to all its child components 
    //Note : this injecting service per component level only, its not injecting the service @ application level
})
export class AppComponent {

  
}