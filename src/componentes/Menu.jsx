import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return (
        <nav>
            <Link to="/producto" style={{ margin: 10 }}>Productos</Link>
            <Link to="/ventas" style={{ margin: 10 }}>Ventas</Link>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
        </nav>
    )
}