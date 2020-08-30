import React, {Component} from "react";
import {Table} from "react-bootstrap";
import ProductItem from "./ProductItem";

interface ProductContract {
    id: string,
    nome: string,
    estoque: number,
    unidade_medida: string,
    vender: boolean,
    preco_venda: number
}

interface ProductListContract {
    data: Array<ProductContract>
}

class ProductList extends Component<ProductListContract, ProductListContract> {
    render() {
        return (
            <Table>
                <thead>
                    <th>Nome</th>
                    <th>Estoque</th>
                    <th>Und. Medida</th>
                    <th>Vender</th>
                    <th>Valor(R$)</th>
                </thead>
                <tbody>
                    {this.props.data.map((item, key) => {
                        return (
                            <ProductItem {...item} key={key}/>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default ProductList;