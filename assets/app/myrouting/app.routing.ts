import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "../messages/messages.component";
import { AuthenticationComponent } from "../auth/authentication.component";
import { PageNotFoundComponent } from "../pagenotfound/pagenotfound.component";
import { MY_AUTH_ROUTES } from "../auth/auth.routing";

const MY_APP_ROUTES: Routes = [
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, children: MY_AUTH_ROUTES },
    //telling '/auth' has child/sub-routes i.e- '/auth/signup', '/auth/signin', '/auth/logout'
    { path: 'pagenotfound', component: PageNotFoundComponent },
    { path: "", redirectTo: '/messages', pathMatch: 'full' },
    { path: "**", redirectTo: "pagenotfound", pathMatch: "full" }
]

//MY_APP_ROUTES -> is the root route(which handles all routes for- 'localhost:3000/___')
//MY_AUTH_ROUTES -> is the child route for '/auth'(which handles all routes for- 'localhost:3000/auth/___')

export const myAppRouting = RouterModule.forRoot(MY_APP_ROUTES);//RouterModule ->this will register our user-define routes to -> angular router module libr
