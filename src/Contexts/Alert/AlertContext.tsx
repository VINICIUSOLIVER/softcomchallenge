import React, {createContext, useContext, useState} from "react";
import ChildrenContextContract from "../../Contracts/Default/ChildrenContextContract";
import AlertContextContract from "../../Contracts/Alert/AlertContextContract";

export const AlertContext = createContext<AlertContextContract>({} as AlertContextContract);

export default function AlertProvider(props: ChildrenContextContract) {
    const [show, setShow] = useState<boolean>(false);
    const [timing, setTiming] = useState<number>(3000);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<string>("dark");

    function success(message: string): void {
        setTitle("Sucesso!");
        setMessage(message);
        setType("success");
        setShow(true);
    }

    function warning(message: string): void {
        setTitle("Aviso!");
        setMessage(message);
        setType("warning");
        setShow(true);
    }

    function danger(message: string): void {
        setTitle("Erro!");
        setMessage(message);
        setType("danger");
        setShow(true);
    }

    function info(message: string): void {
        setTitle("Informação!");
        setMessage(message);
        setType("info");
        setShow(true);
    }

    function custom(title: string, message: string, type: string): void {
        setTitle(title);
        setMessage(message);
        setType(type);
        setShow(true);
    }

    return (
        <AlertContext.Provider value={{
            show,
            timing,
            title,
            message,
            type,
            setShow,
            setTiming,
            success,
            warning,
            danger,
            info,
            custom
        }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    const {show, timing, title, message, type, setTiming, setShow, success, warning, danger, info, custom} = context;

    return {show, timing, title, message, type, setTiming, setShow, success, warning, danger, info, custom};
}