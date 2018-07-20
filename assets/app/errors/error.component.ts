import { Component, OnInit } from '@angular/core';
import { MyError } from './models/error.model';
import { ErrorService } from './error.service';

@Component({
    selector: 'my-app-error',
    templateUrl: './error.component.html',
    styles: [`
    .backdrop{
        background-color: rgba(0,0,0,0.6);
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100vh;
    }
    `]
})

export class ErrorComponent implements OnInit {
    constructor(private errorService: ErrorService) { }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (erObj: MyError) => {
                    this.myErrorObj = erObj;//assingning the erObj to myErrorObj variable
                    this.displayError = 'block';
                }
            )
    }

    myErrorObj: MyError;
    displayError = 'none';

    onErrorHandled() {
        this.displayError = 'none';
    }
}