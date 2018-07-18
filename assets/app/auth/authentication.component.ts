import { Component, OnInit } from '@angular/core';
import { AuthService } from './authservice/auth.service';

@Component({
    selector: 'my-app-authentication',
    templateUrl: './authentication.component.html'
})

//parent component for auth
export class AuthenticationComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    isUserLoggedIn(){
        return this.authService.isLoggedIn();
    }

}