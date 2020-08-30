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

    formatMoney = (value: number): string => {
        let format = Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        });

        return format.format(value).replace("R$", "").trimLeft();
    }

    render() {
        return (
            <tr key={this.props.id}>
                <td>{this.props.nome}</td>
                <td>{this.formatMoney(this.props.estoque)}</td>
                <td>{this.props.unidade_medida}</td>
                <td>{this.props.vender ? 'Sim' : 'Não'}</td>
                <td>{this.formatMoney(this.props.preco_venda)}</td>
            </tr>
        );
    }
}

export default ProductItem;