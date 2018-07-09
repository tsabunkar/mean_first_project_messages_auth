import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
 
import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';

@NgModule({
    declarations: [//userdefine component,directives,pipes
        AppComponent,
        MessageComponent
    ],
    imports: [BrowserModule,FormsModule],//builtin Modules(package)
    bootstrap: [AppComponent]
})
export class AppModule {

}