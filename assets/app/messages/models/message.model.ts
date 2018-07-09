export class Message {
    content: string;
    username: string;
    messageId?: string; //string bcoz Mongodb create ObjectId -> which can better represented by string
    userId?: string;//?-> this property is optional

    constructor(content: string, username: string, messageId?: string, userId?: string) {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
}