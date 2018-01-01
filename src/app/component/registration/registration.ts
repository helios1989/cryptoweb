export class NewUser {
    constructor(
        public username?: string,
        public password?: string,
        public confirmPassword?: string, 
        public fullname?: string,
        public email?: string,
        public token?: string
) {}
}
