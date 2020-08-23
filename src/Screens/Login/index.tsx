import React, {Fragment, FormEvent, useState, useEffect} from "react";
import {Form, Col, Row} from "react-bootstrap";
import {ButtonWarning} from "../../Components/Buttons/Button";
import ContainerLogin from "./Support/View/ContainerLogin";

import {useLoading} from "../../Contexts/Loading/LoadingContext";
import {useAuth} from "../../Contexts/Auth/AuthContext";
import RoutePropsContract from "../../Contracts/Default/RoutePropsContract";
import {useAlert} from "../../Contexts/Alert/AlertContext";


export default function Login(props: RoutePropsContract) {
    const [url, setUrl] = useState("");
    const {logged, setLogged, singIn} = useAuth();
    const {warning} = useAlert();

    useEffect(() => {
        if (logged) {
            {props.history.push("/home")}
        }
    })

    const handle = (event: FormEvent) => {
        event.preventDefault();

        if (url === "") {
            warning("Preencha o campo url!");

            return false;
        }

        localStorage.setItem("@softcomchallenge/url", url);

        singIn().then((response: boolean) => {
            if (response) {
                setLogged(true);
                {props.history.push("/home")}
            }

            setLogged(false);
        }).catch((error: string) => {
            setLogged(false);

            return false;
        });
    }

    return (
        <Fragment>
            <ContainerLogin height={window.innerHeight}>
                <Row className="justify-content-md-center">
                    <Col xs="4" className="container-login">
                        <Form>
                            <div className="form-logo">
                                <img src="/images/logo-softcom.png" alt="Logo Softcom" title="Logo Softcom"/>
                            </div>
                            <Form.Group controlId="formGroupUrl">
                                <Form.Label>URL*</Form.Label>
                                <Form.Control type="text" defaultValue="" placeholder="URL" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setUrl(event.target.value);
                                }}/>
                            </Form.Group>
                            <div style={{marginTop: 40}}>
                                <ButtonWarning onClick={handle}>
                                    Entrar
                                </ButtonWarning>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </ContainerLogin>
        </Fragment>
    );
}
