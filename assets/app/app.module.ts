import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message/message.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageInputComponent } from './messages/message-input/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header/header.component';
import { myAppRouting } from './myrouting/app.routing';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignInComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/signup/signup.component';

@NgModule({
    declarations: [//userdefine component,directives,pipes
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        PageNotFoundComponent,
        LogoutComponent,
        SignInComponent,
        SignUpComponent

    ],
    imports: [BrowserModule, FormsModule, myAppRouting, ReactiveFormsModule],//builtin & user-define Modules(package)
    //myAppRouting-> user-define module(in this we r twiking router module)
    bootstrap: [AppComponent]
})
export class AppModule {

}