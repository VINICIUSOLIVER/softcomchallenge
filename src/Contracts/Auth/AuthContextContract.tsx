export default interface AuthContextContract {
    logged: boolean,
    token: string|null,
    setLogged(logged: boolean): void,
    singIn(): Promise<boolean>,
    singOut(): boolean
};