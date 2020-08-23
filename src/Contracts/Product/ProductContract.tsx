export default interface ProductContract {
    id: string,
    nome: string,
    estoque: number,
    unidade_medida: string,
    vender: boolean,
    preco_venda: number
}