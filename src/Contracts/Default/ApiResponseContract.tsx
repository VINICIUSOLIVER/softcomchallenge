export default interface ApiResponseContract<T> {
    code: number,
    data: T,
    human: string,
    message: string,
    meta: Array<any>
}