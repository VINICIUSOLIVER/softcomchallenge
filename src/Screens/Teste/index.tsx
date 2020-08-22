import React, { Component } from "react";
import {Link} from "react-router-dom";

class Teste extends Component {
    render() {
        return (
            <div style={{backgroundColor: "red", padding: 20}}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/teste">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Teste;