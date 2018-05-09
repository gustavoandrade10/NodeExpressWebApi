export class BaseResponse {

    success: boolean;
    dataLength: number;
    error: ErrorResponse;
    data: any;
    
    constructor(success: boolean = false, dataLength: number = 0) {
        this.success = success;
        this.dataLength = dataLength;
    }
}


export class ErrorResponse {

    private erro: string;
    private message: string;

    constructor(erro: string, message: string) {
        this.erro = erro;
        this.erro = erro;
    }

}