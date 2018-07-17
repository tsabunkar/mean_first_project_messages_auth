import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authservice/auth.service';
import { User } from '../models/user.model';

@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html'
})

//Reactive form approach
export class SignUpComponent implements OnInit {

    constructor(private authService: AuthService) {//This AuthService is injected at application level
        //(check in app.module.ts), but if any component want to use this service then it must be written
        // in the constructor as well(just like injecting service per component level)
    }

    myForm: FormGroup;//its a group or collection of controls(input text, checkbox, etc) in the form

    ngOnInit() {
        this.myForm = new FormGroup({//in this formGroup, we register our controls of our form
            firstNameContr: new FormControl(null, Validators.required),//first argum is default value set inside input textbox, 2nd argum is required similar to required argume
            lastNameContr: new FormControl(null, Validators.required),
            emailContr: new FormControl(null, [Validators.required, Validators.email]),
            passwordContr: new FormControl(null, Validators.required),

        });
    }

    onSubmit() {
        console.log(this.myForm.value.emailContr, this.myForm.value.passwordContr,
            this.myForm.value.firstNameContr,
            this.myForm.value.lastNameContr);
        const userObj = new User(
            this.myForm.value.emailContr,
            this.myForm.value.passwordContr,
            this.myForm.value.firstNameContr,
            this.myForm.value.lastNameContr
        );
        this.authService.signup(userObj)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            )
        console.log(this.myForm);
        this.myForm.reset();//clear all the form fields
    }

}