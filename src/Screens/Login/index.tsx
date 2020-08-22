import React, {Fragment, FormEvent, Component} from "react";
import {Form, Col, Row} from "react-bootstrap";
import {ButtonWarning} from "../../Components/Buttons/Button";
import ContainerLogin from "./Support/View/ContainerLogin";

import LoadingContext from "../../Contexts/Loading/Loading";
import LoginStateContract from "./Contract/LoginStateContract";
import RoutePropsContract from "../../Router/Contracts/RoutePropsContract";

import {AxiosResponse} from "axios";
import {createToken as createTokenApi, testToken, registerDevice as registerDeviceApi, registerDevice} from "../../Services/token";
import TokenResponseContract from "../../Services/Contracts/Token/TokenResponseContract";

import TokenResponseCreateDevice from "../../Contracts/Token/TokenResponseCreateDevice";

class Login extends Component<RoutePropsContract, LoginStateContract> {
    static contextType = LoadingContext;

    constructor(props: RoutePropsContract) {
        super(props);

        this.state = {
            url: ""
        }
    }

    componentDidMount() {
        // this.verifyToken();
    }

    verifyToken = () => {
        this.context.setLoading(true);

        let token = localStorage.getItem("@softcomchallenge/token");

        if (token === null) {
            return false;
        }

        return testToken().then((response: AxiosResponse<TokenResponseContract>) => {
            if (response.data.code !== 70) {
                this.props.history.push("/home");

                return true;
            }
        }).catch(error => {
            return false;
        });
    }

    setUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            url: event.target.value
        })
    }

    handle = (event: FormEvent) => {
        event.preventDefault();

        this.context.setLoading(true);
        localStorage.setItem("@softcomchallenge/url", this.state.url);
        const [registerDeviceStatus, registerDeviceMessage] = this.registerDevice();

        console.log(registerDeviceStatus, registerDeviceMessage);

        if (!registerDeviceStatus) {
            this.context.setLoading(false);
            alert(registerDeviceMessage);

            return false;
        }

        const [createTokenStatus, createTokenMessage] = this.createToken();

        if (!createTokenStatus) {
            this.context.setLoading(false);
            alert(createTokenMessage);

            return false;
        }

        this.props.history.push("/home");

        return true;
    }

    createToken = () : Array<any> => {
        let status = false,
            message = "";

        createTokenApi()
            .then(response => {
                if (response.data.code !== 1) {
                    status = false;
                    message = response.data.human;

                    return false;
                }

                localStorage.setItem("@softcomchallenge/token", response.data.data.token);

                status = true;

                return true;
            })
            .catch((error: string) => {
                status = false;
                message = error;

                return false;
            });

        return [
            status,
            message
        ];
    }

    registerDevice = () : Array<any> => {
        let status = false,
            message = "",
            bla = null;

        bla = registerDeviceApi()
            .then((response : AxiosResponse<TokenResponseCreateDevice>) => {
                if (response.data.code === 1) {
                    // localStorage.setItem("@softcomchallenge/client_id", response.data.data.client_id);
                    // localStorage.setItem("@softcomchallenge/client_secret", response.data.data.client_secret);
                    // localStorage.setItem("@softcomchallenge/client_company_fantasy", response.data.data.empresa_fantasia);
                    // localStorage.setItem("@softcomchallenge/client_company_name", response.data.data.empresa_name);

                    status = false;
                    message = response.data.human;

                    return false;
                }

                if (response.data.code === 62 && (localStorage.getItem("@softcomchallenge/client_id") !== "undefined" && localStorage.getItem("@softcomchallenge/client_id") !== undefined) && (localStorage.getItem("@softcomchallenge/client_secret") !== "undefined" && localStorage.getItem("@softcomchallenge/client_secret") !== undefined)) {

                }

                status = true;

                return true;
            }).catch((error: string) => {
                status = false;
                message = error;

                return false;
            });

        console.log(bla);

        return [
            status,
            message
        ];
    }

    render() {
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
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.url} placeholder="URL" onChange={this.setUrl}/>
                                </Form.Group>
                                <div style={{marginTop: 40}}>
                                    <ButtonWarning onClick={this.handle}>
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
}

export default Login;