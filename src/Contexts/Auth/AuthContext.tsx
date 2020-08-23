import React, {createContext, useContext, useEffect, useState} from "react";
import AuthContextContract from "../../Contracts/Auth/AuthContextContract";
import ChildrenContextContract from "../../Contracts/Default/ChildrenContextContract";
import {createToken, registerDevice as registerDeviceApi, testToken} from "../../Services/token";
import {AxiosResponse} from "axios";
import CreateDeviceContract from "../../Contracts/Token/CreateDeviceContract";
import ApiResponseContract from "../../Contracts/Default/ApiResponseContract";
import TokenCreateContract from "../../Contracts/Token/TokenCreateContract";
import {useAlert} from "../Alert/AlertContext";

export const AuthContext = createContext<AuthContextContract>({} as AuthContextContract);

export default function AuthProvider(props: ChildrenContextContract) {
    const [logged, setLogged] = useState<boolean>(false);
    const [token, setToken] = useState<string|null>(localStorage.getItem("@softcomchallenge/token"));
    const {success, danger, warning} = useAlert();

    useEffect(() => {
        if (!logged) {
            isLogged();
        }
    }, []);

    async function isLogged(): Promise<boolean> {
        const clientId = localStorage.getItem("@softcomchallenge/client_id"),
              clientSecret = localStorage.getItem("@softcomchallenge/client_secret");

        if (clientId === null || clientSecret === null) {
            localStorage.clear();
            setLogged(false);

            return logged;
        }

        return await testToken()
            .then((response: AxiosResponse<ApiResponseContract<Array<any>>>) => {
                console.log(response.data);
                if (response.data.code === 70) {
                    localStorage.clear();

                    return false;
                }

                setLogged(true);

                setToken(localStorage.getItem("@softcomchallenge/token"));

                return true;
            }).catch((error: string) => {
                setLogged(false);
                danger(error);

                return false;
            });
    }

    async function singIn(): Promise<boolean> {
        return registerDeviceApi()
            .then((response : AxiosResponse<ApiResponseContract<CreateDeviceContract>>) => {
                if (response.data.code === 1) {
                    localStorage.setItem("@softcomchallenge/client_id", response.data.data.client_id);
                    localStorage.setItem("@softcomchallenge/client_secret", response.data.data.client_secret);
                    localStorage.setItem("@softcomchallenge/client_company_fantasy", response.data.data.empresa_fantasia);
                    localStorage.setItem("@softcomchallenge/client_company_name", response.data.data.empresa_name);

                    return generateToken();
                }

                if (response.data.code === 62) {
                    warning(response.data.human);

                    setLogged(false);

                    return false;
                }

                setLogged(false);

                danger(response.data.human);

                return false;
            }).catch((error: string) => {
                localStorage.clear();

                setLogged(false);
                danger(error);

                return false;
            });
    }

    function singOut(): boolean {
        setLogged(false);
        localStorage.clear();
        success("Sua sessão foi encerrada!");

        return true;
    }

    async function generateToken() : Promise<boolean> {
        return createToken()
            .then((response: AxiosResponse<ApiResponseContract<TokenCreateContract>>) => {
                if (response.data.code === 1) {
                    setLogged(true);
                    setToken(response.data.data.token);

                    localStorage.setItem("@softcomchallenge/token", response.data.data.token);

                    return true;
                }

                localStorage.clear();

                setLogged(false);
                danger(response.data.human);

                return false;
            }).catch((error: string) => {
                localStorage.clear();

                setLogged(false);
                danger(error);

                return false;
            });
    }

    return (
        <AuthContext.Provider value={{
            logged: logged,
            setLogged,
            token: token,
            singIn,
            singOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    const {logged, setLogged, token, singIn, singOut} = context;

    return {logged, setLogged, token, singIn, singOut};
}

