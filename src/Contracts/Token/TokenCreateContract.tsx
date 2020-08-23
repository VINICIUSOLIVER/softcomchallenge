export default interface TokenCreateContract {
    token: string,
    expires_in: number,
    type: string,
    scope: string|null
}