export interface TokenResponseCreateDeviceData {
    client_id: string,
    client_secret: string,
    device_id: string,
    device_name: string,
    empresa_fantasia: string,
    empresa_name: string
}

export default interface TokenResponseCreateDevice {
    code: number,
    data: TokenResponseCreateDeviceData,
    human: string,
    message: string,
    meta: Array<any>
}