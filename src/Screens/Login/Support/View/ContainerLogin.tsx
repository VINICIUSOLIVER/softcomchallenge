import React from "react";
import styled from "styled-components";

interface ContainerLoginContract {
    height: number
}

const ContainerLogin = styled.div((props : ContainerLoginContract) => ({
    "display" : "flex",
    "height": `${props.height}px`,
    "justify-content": "center",
    "align-items": "center",
    ".row": {
        "width": "100%",
        ".container-login": {
            "background-color": "#fff",
            "padding": "40px",
            "border-radius": "5px",
            "box-shadow": "0 17px 20px rgba(31, 31, 31, 0.5)",
            ".form-logo": {
                "width": "100%",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "margin-bottom": "40px",
                "img": {
                    "width": "50%"
                }
            }
        }
    }
}));

export default ContainerLogin;