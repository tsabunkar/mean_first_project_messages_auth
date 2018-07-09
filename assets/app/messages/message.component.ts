import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    message: any = {
        content: 'HI bro, How r you ?',
        author: 'Tejas'
    }
}