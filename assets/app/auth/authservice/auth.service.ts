import { User } from '../models/user.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../../errors/error.service';

@Injectable()
export class AuthService {

    private url: string = 'http://localhost:4000/user';

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    //POST
    //http://localhost:4000/user
    signup(user: User) {
        const httpHeaderOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'my-auth-token'
            })
        };
        const dataToSend = JSON.stringify(user);
        return this.http.post<User>(this.url, dataToSend, httpHeaderOptions)
            .pipe(
                map((response: Response) => {
                    console.log(response);
                    return response
                }),
                catchError(err => {
                    this.errorService.handlerError(err);
                    throw err;
                })
            )
    }

    //POST
    //http://localhost:4000/user/signin
    signin(user: User) {
        const httpHeaderOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const dataToSend = JSON.stringify(user);
        return this.http.post<User>(this.url + '/signin', dataToSend, httpHeaderOptions)
            .pipe(
                map((response: Response) => response),
                catchError(err => {
                    this.errorService.handlerError(err);
                    throw err;
                })
            )
    }


    logout() {
        localStorage.clear();//clearing myToken and myuserId value which were stored in localStorage in the browser

    }

    isLoggedIn() {//if myToken has value and its not equal to null then, this method return true(which means user is logged in)
        return localStorage.getItem('myToken') !== null;
    }
}