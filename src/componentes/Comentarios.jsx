import React, { useEffect, useState } from 'react';
import { consumir } from '../api/apiComentarios';

export function Comentarios() {
    const [listComments, setListComments] = useState([]);
    useEffect(()=>{
        const peticion = async () =>{
            const data = await consumir();
            setListComments(data);
        }
        peticion();
    },[])
    return(
        <div>
            {listComments.map(com => <p>{com.body}</p>)}
        </div>
    )
    
}