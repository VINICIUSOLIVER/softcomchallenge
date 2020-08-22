import React from "react";
import {LoadingProvider} from "../Contexts/Loading/Loading";
import {Container} from "react-bootstrap";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import Home from "../Screens/Home";
import Loading from "../Components/Loading";
import Login from "../Screens/Login";

export default function Router() {
    return (
        <LoadingProvider>
            <Container fluid>
                <Loading />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </LoadingProvider>
    );
}