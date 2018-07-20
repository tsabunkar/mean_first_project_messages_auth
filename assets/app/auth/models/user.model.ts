export class User {
    constructor(
        public email: string,
        public password: string,
        public firstName?: string, //? -> these properties are optional, we r not forcing the end-client to enter this property, if end-client not define this prop then value will be undefined
        public lastName?: string
    ) {

    }
}