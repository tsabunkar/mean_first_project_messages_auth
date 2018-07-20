import { Injectable, EventEmitter } from '@angular/core';
import { MyError } from './models/error.model';

@Injectable()
export class ErrorService {

    constructor() { }

    errorOccurred = new EventEmitter<MyError>();

    handlerError(errorObj : any) {
        console.log(errorObj);
        const errorData = new MyError(errorObj.error.title, errorObj.error.error.message);
        console.log(errorData);
        this.errorOccurred.emit(errorData);//this will emit this event
    }
}