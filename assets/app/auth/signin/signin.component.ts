import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../authservice/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signin-component',
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }//no need to add this ServiceName in
    // providers array for this component bcoz AuthService is not injected per component level but at Application level

    myForm: FormGroup;//its a group or collection of controls(input text, checkbox, etc) in the form

    ngOnInit() {
        this.myForm = new FormGroup({//in this formGroup, we register our controls of our form
            emailContr: new FormControl(null, [Validators.required, Validators.email]),
            passwordContr: new FormControl(null, Validators.required),
        });
    }

    onSubmit() {
        const userObject = new User(this.myForm.value.emailContr, this.myForm.value.passwordContr);
        console.log(this.myForm.value.emailContr, this.myForm.value.passwordContr);
        this.authService.signin(userObject)
            .subscribe(
                data => {

                    //when we recieved the jwttoken, we can store it in browsers localStorage and SessionStorage
                    //or u can store in browsers cookie
                    //Here we r using -> localStroage to store the token
                    if (data["status"] === 200) {
                        localStorage.setItem('myToken', data["token"]);
                        localStorage.setItem('myuserId', data["userId"]);
                        this.router.navigateByUrl('/');
                    }
                },
                err => console.log(err)
            );

        console.log(this.myForm);
        this.myForm.reset();//clear all the form fields
    }
}