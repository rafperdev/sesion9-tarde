import React from "react";
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <>
            <Link to="/producto">Productos</Link> <br />
            <Link to="/ventas">Ventas</Link>
        </>
    )
}