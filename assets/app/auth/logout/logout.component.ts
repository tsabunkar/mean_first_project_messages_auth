import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'logout-component',
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {
    constructor(private authService: AuthService, private router:Router) { }

    ngOnInit() { }
    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth','signin'])
    }
}