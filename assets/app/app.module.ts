//builtin modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
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
import { AuthService } from './auth/authservice/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';


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
        SignUpComponent,
        ErrorComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        myAppRouting,
        ReactiveFormsModule,
        HttpClientModule
    ],//builtin & user-define Modules(package)
    //myAppRouting-> user-define module(in this we r twiking router module)
    bootstrap: [AppComponent],
    providers: [AuthService, ErrorService]//injecting service at Application level, thus this service(AuthService) can be used throught the application
})
export class AppModule {

}