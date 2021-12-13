import React, { useEffect, useState } from "react";

export function VentasListar(props) {
    const [listado, setListado] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/ventas/listar")
            .then(res => res.json())
            .then(res => {
                setListado(res);
            })
    }, [props.refresh])
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    listado.map(v => <tr><td>{v.producto.nombre}</td><td>{v.total}</td></tr>)
                }
            </tbody>
        </table>
    )
}