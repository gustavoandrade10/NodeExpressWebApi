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

    constructor(erro?: string, message?: string){
        this.erro = erro;
        this.message = message;
    }

    erro: string;
    message: string;
}