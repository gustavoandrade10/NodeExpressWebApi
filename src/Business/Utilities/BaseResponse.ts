export class BaseResponse {

    constructor(success: boolean = false, dataLength: number = 0) {
        this.success = success;
        this.dataLength = dataLength;
    }

    success: boolean;
    dataLength: number;
    error: ErrorResponse;
    data: any;
}


export class ErrorResponse {
    erro: string;
    message: string;
}