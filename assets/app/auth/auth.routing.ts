import { Routes } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";
import { SignInComponent } from "./signin/signin.component";
import { LogoutComponent } from "./logout/logout.component";

//these routes(singin,singup,logout) will be sub-routes(child-route) for /auth
//i.e-> localhost:3000/auth/____  <- after /auth route, the below routes comes to picture
export const MY_AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'singup', pathMatch: 'full' },
    { path: 'singup', component: SignUpComponent },
    { path: 'singin', component: SignInComponent },
    { path: 'logout', component: LogoutComponent },
]
//MY_AUTH_ROUTES -> is the child route for '/auth'