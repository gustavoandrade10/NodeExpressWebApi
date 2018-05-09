export class BaseToken {
    access_token: string;
    //in seconds
    expires_in: string | number; 
    // date format
    expires: Date;
}