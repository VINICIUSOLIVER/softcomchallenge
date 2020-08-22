import React from "react";
import styled from "styled-components";

interface PropsButton {
    disabled?: boolean
}

const Button = styled.button((props: PropsButton) => ({
    "padding": "0.6em 1.8em",
    "border": "none",
    "border-width": "1px",
    "font-weight": "bolder",
    "border-radius": "3px",
    "box-shadow": "none",
    "cursor": !props?.disabled ? "pointer" : "not-allowed",
    "opacity": !props?.disabled ? "1" : ".5"
}));

export const ButtonPrimary = styled(Button)((props: PropsButton) => ({
    "background-color": "#003feb",
    "color": "#fff",
    "border-color": "#0037cc",
    "&:hover": {
        "background-color": !props?.disabled ? "#0037cc" : "#003feb"
    }
}));

export const ButtonSuccess = styled(Button)((props: PropsButton) => ({
    "background-color": "#00C6BC",
    "color": "#fff",
    "border-color": "#00a8a0",
    "&:hover": {
        "background-color": !props.disabled ? "#00a8a0" : "#00C6BC"
    }
}));

export const ButtonDanger = styled(Button)((props: PropsButton) => ({
    "background-color": "#E40009",
    "color": "#fff",
    "border-color": "#ba0209",
    "&:hover": {
        "background-color": !props.disabled ? "#ba0209" : "#E40009"
    }
}));

export const ButtonWarning = styled(Button)((props: PropsButton) => ({
    "background-color": "#f6b517",
    "color": "#fff",
    "border-color": "#dea212",
    "&:hover": {
        "background-color": !props?.disabled ? "#dea212" : "#f6b517"
    }
}));

export const ButtonInfo = styled(Button)((props: PropsButton) => ({
    "background-color": "#009BF5",
    "color": "#fff",
    "border-color": "#006aa8",
    "&:hover": {
        "background-color": !props.disabled ? "#006aa8" : "#009BF5"
    }
}));

export const ButtonDark = styled(Button)((props: PropsButton) => ({
    "background-color": "#1D1A27",
    "color": "#fff",
    "border-color": "#1D1A27"
}));