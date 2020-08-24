import api from "../api";
import ProductStoreContract from "../../Contracts/Product/ProductStoreContract";

export function searchProducts(token: string | null) {
    return api.get("softauth/api/produtos/produtos", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function storeProduct(token: string | null, data: Array<ProductStoreContract>) {
    return api.post("softauth/api/produtos/produtos", {
        "produto": data
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}