import React from "react";
import LoadingProvider from "../Contexts/Loading/LoadingContext";
import {Container} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "../Screens/Home";
import Loading from "../Components/Loading";
import Login from "../Screens/Login";
import AuthProvider from "../Contexts/Auth/AuthContext";
import AlertProvider from "../Contexts/Alert/AlertContext";
import Alert from "../Components/Alert/Alert";

export default function Router() {
    return (
        <AlertProvider>
            <AuthProvider>
                <LoadingProvider>
                    <Container fluid>
                        <Loading />
                        <Alert />
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route path="/home" component={Home} />
                            </Switch>
                        </BrowserRouter>
                    </Container>
                </LoadingProvider>
            </AuthProvider>
        </AlertProvider>
    );
}