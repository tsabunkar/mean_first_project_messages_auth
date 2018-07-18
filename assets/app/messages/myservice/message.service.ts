import { Injectable, EventEmitter } from '@angular/core';
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
    private url: string = 'http://localhost:4000/message';

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
    //POST
    //http://localhost:4000/message
    addMessage(message: Message): Observable<Message> {
        console.log("invoking add message");

        const httpHeaderOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'my-auth-token'
            })
        };
        const token = localStorage.getItem('myToken')
            ? '?token=' + localStorage.getItem('myToken')
            : '';

        const dataToSend = JSON.stringify(message)
        //post() -> return type of ->Observable<Response> & //pipe() -> return type of ->Observable<{}>

        console.log(this.url + token);//http://localhost:4000/message?token=eyJhbGci452395_____
        let observableObj: Observable<Message> = this.http.post<Message>(this.url + token, dataToSend, httpHeaderOptions);
        let pipeObj: Observable<Message> = observableObj.pipe<Message>(//any no of operations like map(), filter(),scan(),first(), last(), catchError(), mergeMap(), switchMap(),etc 
            map((response: Response) => {
                console.log(response);
                console.log(response.toString());
                const respondedMessage = response["obj"];
                const newlyCreatedMess = new Message(respondedMessage.content, "Admin", respondedMessage._id, null)
                this.messageList.push(newlyCreatedMess);//if new message is created then only push that newlyCreatedMessage into the MessageList Array
                return newlyCreatedMess;//must return (or else) when subscribe we will get undefined
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


    //GET_ALL
    //http://localhost:4000/message
    getMessages(): Observable<Message[]> {
        console.log("invoking getAll message");
        return this.http.get<Message[]>(this.url)
            .pipe(
                map((resp: Response) => {
                    console.log(resp);
                    // console.log(resp.toString().message);
                    let listOfmessagesFrmBackend = resp["listMessages"];// is similar to -> resp.listMessages;
                    let transformedBackendDtoToFrontendDto: Message[] = [];
                    for (const mess of listOfmessagesFrmBackend) {
                        // console.log(mess);
                        transformedBackendDtoToFrontendDto.push(new Message(mess.content, "Admin", mess._id, null))
                    };
                    this.messageList = transformedBackendDtoToFrontendDto;

                    return transformedBackendDtoToFrontendDto;
                }),
                catchError(err => of(err))
            )
    }

    messageIsEdited = new EventEmitter<Message>();//to know weather edit btn is clicked

    editMessage(message: Message) {
        console.log("invoking edit message");
        this.messageIsEdited.emit(message);
    }

    //PATCH
    //http://localhost:4000/message/124ef455D
    updateMessage(message: Message): Observable<Message> {

        const httpHeaderOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const token = localStorage.getItem('myToken')
            ? '?token=' + localStorage.getItem('myToken')
            : '';


        console.log("invoking update message");
        console.log(message.messageId);
        const dataToSend = JSON.stringify(message)
        return this.http.patch<Message>(this.url + '/' + message.messageId + token, dataToSend, httpHeaderOptions)
            .pipe(
                map((response: Response) => { return response }),
                catchError(err => of(err))
            );

    }

    //DELETE
    //http://localhost:4000/message/124ef455D
    deletedMessage(message: Message): Observable<Message> {
        console.log("invoking delete message");
        const token = localStorage.getItem('myToken')
            ? '?token=' + localStorage.getItem('myToken')
            : '';

        console.log(this.url + '/' + message.messageId + token);//http://localhost:4000/message/5b4ef___?token=eyJjN543q0___
        return this.http.delete<Message>(this.url + '/' + message.messageId + token)
            .pipe(
                map((response: Response) => {
                    if (response["obj"]) {//if valid object is returned, which means message got deleted
                        this.messageList.splice(this.messageList.indexOf(message), 1);//removing one element from the messageList array
                        console.log(response);
                        return response
                    }
                }),
                catchError(err => of(err))
            )
    }

}