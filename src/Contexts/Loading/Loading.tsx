import React, {Component, createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";

interface ChildrenType {
    children: React.ReactNode
}

interface StateValues {
    loading: boolean
}

interface ContextValues {
    loading: boolean,
    setLoading(loading: boolean): void
}

const LoadingContext = createContext<ContextValues>({} as ContextValues);

export class LoadingProvider extends Component<ChildrenType, StateValues> {
    state = {
        loading: false
    }

    setLoading = (loading: boolean) => {
        this.setState({loading});
    }

    render() {
        const {children} = this.props;
        const {loading} = this.state;
        const {setLoading} = this;

        return (
            <LoadingContext.Provider value={{
                loading,
                setLoading
            }}>
                {children}
            </LoadingContext.Provider>
        );
    }
}

export default LoadingContext;




