import api from "../api";

export async function searchProducts() {
    return await api.get("softauth/api/produtos/produtos", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("@softcomchallenge/token")}`
        }
    });
}