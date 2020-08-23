export default interface AlertContextContract {
    show: boolean,
    timing: number,
    title: string,
    message: string,
    type: string,
    setShow(is: boolean): void,
    setTiming(s: number): void,
    success(message: string): void,
    warning(message: string): void,
    danger(message: string): void,
    info(message: string): void,
    custom(title: string, message: string, type: string): void
}