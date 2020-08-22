import axios from 'axios';

export default axios.create({
    baseURL: "https://qualidade.softcomshop.com.br/",
    responseType: "json"
});