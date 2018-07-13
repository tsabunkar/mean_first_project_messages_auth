import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html'
})

//Reactive form approach
export class SignUpComponent implements OnInit {
    constructor() { }

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
        console.log(this.myForm);
        this.myForm.reset();//clear all the form fields
    }

}