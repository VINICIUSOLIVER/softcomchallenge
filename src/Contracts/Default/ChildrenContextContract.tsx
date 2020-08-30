import React from "react";
import {History} from "history";

export default interface ChildrenContextContract {
    children: React.ReactNode,
    history?: History
};