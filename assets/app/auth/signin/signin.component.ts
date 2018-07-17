import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'signin-component',
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
    constructor() { }

    myForm: FormGroup;//its a group or collection of controls(input text, checkbox, etc) in the form

    ngOnInit() {
        this.myForm = new FormGroup({//in this formGroup, we register our controls of our form
            emailContr: new FormControl(null, [Validators.required, Validators.email]),
            passwordContr: new FormControl(null, Validators.required),
        });
    }

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset();//clear all the form fields
    }
}