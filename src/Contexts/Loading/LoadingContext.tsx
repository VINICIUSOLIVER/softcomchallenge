import React, {createContext, useContext, useState} from "react";
import ChildrenContextContract from "../../Contracts/Default/ChildrenContextContract";
import LoadingContextContract from "../../Contracts/Loading/LoadingContextContract";

export const LoadingContext = createContext<LoadingContextContract>({} as LoadingContextContract);

export default function LoadingProvider(props: ChildrenContextContract) {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{
            loading,
            setLoading
        }}>
            {props.children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    const {loading, setLoading} = context;

    return {loading, setLoading};
}

