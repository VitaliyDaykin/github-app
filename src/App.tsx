import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { RepositorySearch } from "./pages/RepositorySearch/RepositorySearch";
import { UserRepository } from "./pages/UserRepository";
import "./App.scss";
import { Navigation } from "./components/navigation/Navigation";

function App() {
    return (
        <>
            <Navigation />
            <div className="container">
                <Routes>
                    <Route path="/" element={<RepositorySearch />} />
                    <Route
                        path="/userrepository"
                        element={<UserRepository />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
