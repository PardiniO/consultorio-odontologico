export interface RespuestaAPI<T> {
    success: boolean;
    data?: T;
    message: string;
}