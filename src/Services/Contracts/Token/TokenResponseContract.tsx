interface TokenCreated {
    expires_in: number,
    scope: Array<any> | null,
    token: string,
    type: string
}

interface DeviceRegister {
    
}

export default interface TokenResponseContract {
    code: number,
    message: string,
    human: string,
    data: TokenCreated,
    meta: Array<any>
}