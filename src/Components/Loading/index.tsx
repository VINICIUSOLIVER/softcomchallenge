import React, {Component} from "react";
import style from "./style.module.css";
import {useLoading} from "../../Contexts/Loading/LoadingContext";

export default function Loading() {
    const {loading} = useLoading();

    return loading ? (
        <div className={style.container} style={{height: window.innerHeight}}>
            <div className={style.box}>
                <div>
                    <img src="/images/folder-softcom.png" alt=""/>
                </div>
                <div>
                    <div className={style.snippet}>
                        <div className={style.stage}>
                            <div className={style.dotFalling}></div>
                        </div>
                    </div>
                </div>
                <div className={style.text}>
                        <span>
                            <b>Carregando</b>
                        </span>
                </div>
            </div>
        </div>
    ) : null;
}
