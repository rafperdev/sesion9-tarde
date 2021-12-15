import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { auth } from "../auth/auth";
import { VentasListar } from "./VentasListar";

export function Ventas() {
    const [listadoProductos, setListadoProductos] = useState([]);
    const [recarga, setRecarga] = useState(false);
    const prodRef = useRef();
    const totalRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/producto/listar", {
            headers: {
                "authorization": `Bearer ${token}`,
            },
            method: "POST"
        }).then(res => res.json())
            .then(res => {
                if (res.estado === "ok")
                    setListadoProductos(res.data);
            })
    }, [])

    function guardar() {
        const producto = prodRef.current.value;
        const total = totalRef.current.value;
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/ventas/guardar", {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify({ producto, total })
        }).then(res => res.json())
            .then(res => {
                alert(res.msg);
                setRecarga(!recarga);
            })
    }
    return (
        // condición ? true : false
        <>
            {
                auth() ? <div className="container">
                    <div className="row">
                        <div className="col">
                            <form action="">
                                <select className="form-control" ref={prodRef} name="" id="">
                                    <option value="">--Seleccione--</option>
                                    {
                                        listadoProductos.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)
                                    }
                                </select>
                                <label htmlFor="">Total</label>
                                <input ref={totalRef} type="text" className="form-control" />
                                <button className="btn btn-primary" type="button" onClick={guardar}>Guardar</button>
                                <Link to="/ventas/listar">Listar</Link>
                            </form>
                        </div>
                        <div className="col">
                            <VentasListar refresh={recarga} />
                        </div>
                    </div>
                </div>
                    : <Navigate to="/" />
            }
        </>

    )
}