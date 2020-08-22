import React, {Component, Dispatch, SetStateAction} from "react";

import {Row, Col, Table} from "react-bootstrap";
import {ButtonPrimary, ButtonWarning} from "../../Components/Buttons/Button";

import RoutePropsContract from "../../Router/Contracts/RoutePropsContract";

import {searchProducts} from "../../Services/Product";
import LoadingContext from "../../Contexts/Loading/Loading";
import ProductList from "../../Components/Product/ProductList";

interface ProductContract {
    id: string,
    nome: string,
    estoque: number,
    unidade_medida: string,
    vender: boolean,
    preco_venda: number
}

interface HomeStateContract {
    data: Array<ProductContract>,
    page: number,
    next: number|null
}

class Home extends Component<RoutePropsContract, HomeStateContract> {
    static contextType = LoadingContext;

    constructor(props: RoutePropsContract) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            next: null
        }
    }

    componentDidMount() {
        this.search();
    }

    search = () => {
        this.context.setLoading(true);

        searchProducts().then(response => {
            if (response.data.code === 1) {
                this.setState({
                    data: response.data.data
                });
            } else {
                alert("Algo de errado aconteceu");
            }
        }).catch(error => {
            alert(`Error ${error}`);
        }).finally(() => {
            this.context.setLoading(false);
        })
    }

    render() {
        return (
            <Row className="justify-content-md-center">
                <Col xs={8}>
                    <Row>
                        <Col xs={6}>
                            <ButtonWarning>
                                Pesquisar
                            </ButtonWarning>
                        </Col>
                        <Col xs={6}>
                            <ButtonPrimary>
                                Adicionar
                            </ButtonPrimary>
                        </Col>
                    </Row>
                    <Row style={{backgroundColor: "#fff", marginTop: 20}}>
                        <Col>
                            <ProductList data={this.state.data}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Home;