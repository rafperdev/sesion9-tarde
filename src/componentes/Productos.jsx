import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function Productos() {
    let listado = [];
    const nomRef = useRef(); //document.getElementById("nom")
    const preRef = useRef();
    const stockRef = useRef();
    const [success, setSuccess] = useState(false);
    const guardar1 = () => {
        //Obtiene lo escrito en las cajas de texto
        const nom = nomRef.current.value;
        const pre = preRef.current.value;
        const stock = stockRef.current.value;
        //Crea el JSON de producto
        const prod = { nom, pre, stock }; // {nom:nom, pre:pre}
        // Obtiene todos los productos almacenados
        listado = JSON.parse(localStorage.getItem("listaProductos")) || [];
        //Adiciona un nuevo producto al array
        listado.push(prod);
        //Guarda en local Storage
        localStorage.setItem("listaProductos", JSON.stringify(listado));
        //Limpia las cajas de texto
        nomRef.current.value = "";
        preRef.current.value = "";
        stockRef.current.value = "";
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };
    function guardar() {
        //Capturar los datos 
        const nombre = nomRef.current.value;
        const precio = preRef.current.value;
        const stock = stockRef.current.value;
        //Consumir la API Guardar
        fetch("http://localhost:8080/producto/guardar", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ nombre, precio, stock })
        }).then(res => res.json())
            .then(res => {
                if (res.estado === "ok") {
                    setSuccess(true);  //Mostrar mensaje de respuesta
                    setTimeout(() => setSuccess(false), 3000);
                    nomRef.current.value = "";
                    preRef.current.value = "";
                    stockRef.current.value = "";
                } else {
                    alert(res.msg); //Mostrar mensaje de respuesta
                }
            })
    }
    function consultar() {
        //Capturar los datos 
        const nombre = nomRef.current.value;
        //Consumir la API Guardar
        fetch("http://localhost:8080/producto/consultar", {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ nombre })
        }).then(res => res.json())
            .then(res => {
                if (res.estado === "ok") {
                    nomRef.current.value = res.data.nombre;
                    preRef.current.value = res.data.precio;
                    stockRef.current.value = res.data.stock;
                } else {
                    alert(res.msg); //Mostrar mensaje de respuesta
                }
            })
    }
    return (
        <Fragment>
            {success && <div class="alert alert-success" role="alert">Guardado con éxito :)</div>}
            <form action="">
                <label htmlFor="">Nombre</label>
                <input ref={nomRef} className="form-control" type="text" />
                <label htmlFor="">Precio</label>
                <input ref={preRef} className="form-control" type="text" />
                <label htmlFor="">Stock</label>
                <input ref={stockRef} className="form-control" type="text" />
                <button className="btn btn-primary" type="button" onClick={guardar}>Guardar</button>
                <button className="btn btn-primary" type="button" onClick={consultar}>Consultar</button>
                <Link to="/producto/lista">Listar</Link>
                <Link to="/comentarios">Comentarios</Link>
            </form>
        </Fragment>
    )
}