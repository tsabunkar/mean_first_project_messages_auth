import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "../messages/messages.component";
import { AuthenticationComponent } from "../auth/authentication/authentication.component";
import { PageNotFoundComponent } from "../pagenotfound/pagenotfound.component";

const MY_APP_ROUTES: Routes = [
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent },
    { path: 'pagenotfound', component: PageNotFoundComponent },
    {path : "" , redirectTo: '/messages', pathMatch: 'full' },
    {path : "**" , redirectTo : "pagenotfound", pathMatch : "full"}
]

export const myAppRouting = RouterModule.forRoot(MY_APP_ROUTES);//RouterModule ->this will register our user-define routes to -> angular router module libr
