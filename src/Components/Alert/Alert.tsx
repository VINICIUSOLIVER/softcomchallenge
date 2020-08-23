import React from "react";
import {Alert as AlertBootstrap} from "react-bootstrap";
import {useAlert} from "../../Contexts/Alert/AlertContext";

export default function Alert() {
    const {show, timing,  title, message, type, setShow} = useAlert();
    let timeClose: any = null;

    if (show) {
        timeClose = setTimeout(function () {
            setShow(false);
        }, timing);
    }

    function close() {
        setShow(false);
        finishTimeOut();
    }

    function finishTimeOut() {
        if (timeClose !== null) {
            clearInterval(timeClose);
        }
    }

    return (
        show ? <AlertBootstrap variant={type} onClose={close} dismissible style={{position: "absolute", zIndex: 99999, width: "30%", right: 20, bottom: 20, margin: "auto"}}>
            <AlertBootstrap.Heading>{title}</AlertBootstrap.Heading>
            <p>{message}</p>
        </AlertBootstrap> : null
    );

};