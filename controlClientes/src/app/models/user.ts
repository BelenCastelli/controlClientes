export class User {
    email?:string; 
    password?:string;
    _id?: string;

    constructor(email?: string, password?: string, _id?: string) {
        this.email = email;
        this.password = password;
        this._id = _id;
    }
}
