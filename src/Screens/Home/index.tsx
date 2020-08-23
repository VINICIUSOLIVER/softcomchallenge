import React, {useEffect, useState} from "react";
import {Row, Col, Dropdown} from "react-bootstrap";
import {ButtonPrimary, ButtonWarning} from "../../Components/Buttons/Button";

import {AxiosResponse} from "axios";

import {searchProducts as searchProductsApi} from "../../Services/Product";
import ProductList from "../../Components/Product/ProductList";
import ApiResponseContract from "../../Contracts/Default/ApiResponseContract";
import {useLoading} from "../../Contexts/Loading/LoadingContext";
import {useAlert} from "../../Contexts/Alert/AlertContext";
import ProductContract from "../../Contracts/Product/ProductContract";
import {useAuth} from "../../Contexts/Auth/AuthContext";
import RoutePropsContract from "../../Contracts/Default/RoutePropsContract";

export default function Home(props: RoutePropsContract) {
    const [data, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [next, setNext] = useState<null|number>(null);
    const {setLoading} = useLoading();
    const {success, warning, danger} = useAlert();
    const {token, singOut} = useAuth();

    useEffect(() => {
        // searchProducts();
    }, []);

    async function searchProducts(): Promise<void> {
        setLoading(true);
        const response = await searchProductsApi(token)
            .then((response: AxiosResponse<ApiResponseContract<Array<any>>>) => {
                console.log(response.data);
                if (response.data.code === 1) {
                    setData(response.data.data);
                    setLoading(false);

                    return false;
                }

                danger(response.data.human);
            }).catch((error : string) => {
                danger(error);
            });
    }

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} style={{backgroundColor: "#fff", paddingTop: 20, paddingBottom: 20, marginBottom: 20}}>
                <Row className="justify-content-md-center">
                    <Col xs={10}>
                        <Row>
                            <Col xs={6}>
                                <img src="/images/logo-softcom.png" alt="Logo Softcom" title="Logo Softcom" style={{width: "20%"}}/>
                            </Col>
                            <Col xs={6} style={{textAlign: "right"}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{color: "#fff"}}>
                                        {localStorage.getItem("@softcomchallenge/client_company_fantasy")} - {localStorage.getItem("@softcomchallenge/client_company_name")}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#" onClick={() => {
                                            if (singOut()) {
                                                {props.history.push("/")}
                                            }
                                        }}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={10}>
                <Row>
                    <Col xs={6}>
                        <ButtonWarning>
                            Pesquisar
                        </ButtonWarning>
                    </Col>
                    <Col xs={6} style={{textAlign: "right"}}>
                        <ButtonPrimary>
                            Adicionar
                        </ButtonPrimary>
                    </Col>
                </Row>
                <Row style={{backgroundColor: "#fff", marginTop: 20}}>
                    <Col>
                        <ProductList data={data} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}