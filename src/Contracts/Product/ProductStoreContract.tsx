export default interface ProductStoreContract {
    nome: string,
    margem_lucro: number,
    percentual_comissao_produto: number,
    agrupar_pedido: number,
    unidade_medida: string,
    preco_compra: number,
    preco_venda: number
}