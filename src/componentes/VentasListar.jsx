import React, { useEffect, useState } from "react";

export function VentasListar(props) {
    const [listado, setListado] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/ventas/listar", {
            headers: { "authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => {
                if (res.estado === "ok")
                    setListado(res.data);
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