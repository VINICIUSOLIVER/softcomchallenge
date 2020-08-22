import React, {Component} from "react";

interface ProductContract {
    id: string,
    nome: string,
    estoque: number,
    unidade_medida: string,
    vender: boolean,
    preco_venda: number
}

class ProductItem extends Component<ProductContract, ProductContract> {
    render() {
        return (
            <tr key={this.props.id}>
                <td>{this.props.nome}</td>
                <td>{this.props.estoque}</td>
                <td>{this.props.unidade_medida}</td>
                <td>{this.props.vender ? 'Sim' : 'Não'}</td>
                <td>{this.props.preco_venda}</td>
            </tr>
        );
    }
}

export default ProductItem;