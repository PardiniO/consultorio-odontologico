export interface RespuestaAPI<T> {
    succes: boolean;
    data?: T;
    message: string;
}