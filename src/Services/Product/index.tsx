import api from "../api";

export function searchProducts(token: string | null) {
    return api.get("softauth/api/produtos/produtos", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}