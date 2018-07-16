import { Injectable } from '@angular/core';
import { Message } from '../models/message.model'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';//error :  Cannot find module "rxjs-compat"
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class MessageService {
    constructor(private http: HttpClient) { }

    private messageList: Message[] = [];

    /* //these methods r temporary messages which r playing with array but doesn't store them inside a DB
    addMessage(message: Message) {
        this.messageList.push(message);
        // console.log(this.messageList);
    }
    getMessages() {
        return this.messageList;
    }

    deletedMessage(message: Message) {
        this.messageList.splice(this.messageList.indexOf(message), 1);//removing one element from the messageList array
    } */



    //Using Observable to make server calls from backend(nodejs & mongodb)
    addMessage(message: Message): Observable<Message> {
        const httpHeaderOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'my-auth-token'
            })
        };

        this.messageList.push(message);
        const dataToSend = JSON.stringify(message)
        //post() -> return type of ->Observable<Response>
        //pipe() -> return type of ->Observable<{}>
        let observableObj: Observable<Message> = this.http.post<Message>('http://localhost:4000/message', dataToSend, httpHeaderOptions);
        let pipeObj: Observable<Message> = observableObj.pipe<Message>(//any no of operations like map(), filter(),scan(),first(), last(), catchError(), mergeMap(), switchMap(),etc 
            map((response: Response) => {
                console.log(response);
                console.log(response.toString());
                return response;//must return (or else) when subscribe we will get undefined
            }),
            catchError(err => of(err))//of (operator)->	ArrayObservable
        );

        return pipeObj;



        /* //these dot-chanied technique has been depricated
         this.http.post<Message>('http://localhost:4000/message', dataToSend, httpOptions)
         .map((response : Response => {
             response.json();//will just extract the response.body in the form JSON, while the remining data like response header is not extracted
         }))
         .do()
         .catch();
         */

    }

    getMessages(): Observable<Message[]> {
        return this.http.get<Message[]>('http://localhost:4000/message')
            .pipe(
                map((resp: Response) => {
                    console.log("=======");
                    console.log(resp);
                    // console.log(resp.toString().message);
                    let listOfmessagesFrmBackend = resp["listMessages"];// is similar to -> resp.listMessages;
                    let transformedBackendDtoToFrontendDto: Message[] = [];
                    for (const mess of listOfmessagesFrmBackend) {
                        console.log(mess);
                        transformedBackendDtoToFrontendDto.push(new Message(mess.content, "Admin", mess.id, null))
                    };
                    this.messageList = transformedBackendDtoToFrontendDto;

                    return transformedBackendDtoToFrontendDto;
                }),
                catchError(err => of(err))
            )
    }

    deletedMessage(message: Message) {
        this.messageList.splice(this.messageList.indexOf(message), 1);//removing one element from the messageList array
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

}