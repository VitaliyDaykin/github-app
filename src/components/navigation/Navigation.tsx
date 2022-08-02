import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export function Navigation() {
    return (
        <nav className="navigation-app">
            <div className="navigation-app__link container">
                <h3>Github Search</h3>
                <div>
                    <Link to="/">RepositorySearch</Link>
                </div>
            </div>
        </nav>
    );
}
