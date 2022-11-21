import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material"



export default function AdTa() {
    const [tallerCodigo, setTallerCodigo] = useState("");
    const [tallerNombre, setTallerNombre] = useState("");
    const [tallerDescripcion, setTallerDescripcion] = useState("");
    const [tallerCampus, setTallerCampus] = useState("");
    const [taller, setTaller] = useState([]);
    const [updatedTallerCodigo, setUpdatedTallerCodigo] = useState("");
    const [updatedTallerNombre, setUpdatedTallerNombre] = useState("");
    const [updatedTallerDescripcion, setUpdatedTallerDescripcion] = useState("");
    const [updatedTallerCampus, setUpdatedTallerCampus] = useState("");
    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
    
    useEffect(() => {
        const q = query(collection(db, "taller"));
        onSnapshot(q, (querySnapshot) => {
            setTaller(
            querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            }))
        );
        });
    }, []);
    
    const updateData = (e) => {
        e.preventDefault();

        const docRef = doc(db, "taller", dataIdToBeUpdated);

        setDoc(docRef, {
            nombreTaller: updatedTallerNombre,
            Description: updatedTallerDescripcion
        }, { merge: true })
        .then(() => console.log("Document updated"));

        setUpdatedTallerNombre("");
        setUpdatedTallerDescripcion("");
        setDataIdToBeUpdated("");
    };

    return(
        <div>
            {dataIdToBeUpdated ? (
            <div className="editar">
            <input className= "text-editar"
                type="text"
                placeholder="Nombre"
                value={updatedTallerNombre}
                onChange={(e) => setUpdatedTallerNombre(e.target.value)}
            />
            <input className= "text-editar"
                type="text"
                placeholder="Descripción"
                value={updatedTallerDescripcion}
                onChange={(e) => setUpdatedTallerDescripcion(e.target.value)}
            />
            <Button className="boton-editar" variant="outlined" style={{maxWidth: '100px', maxHeight: '25px', minWidth: '100px', minHeight: '25px'}}
            onClick={updateData}>Actualizar</Button>
            </div>
        ) : (<></>)}

            <link href="../css/hojaAdmins.css" rel="stylesheet" />
            <div>
                <div>
                    <img
                        src="../images/rectangle33561381-14-200h.png"
                        alt="tiraSuperior"
                        className="tiraSuperior"
                    />
                    <span className="textoNombreDeUsuario">
                        <span>Nombre de usuario</span>
                    </span>
                    <img
                        src="../images/perfil11381-dvdt-200h.png"
                        alt="imgPerfil"
                        className="imagenDePerfil"
                    />
                    <div className="botones-header">
                        <button className="boton-cerrarsesion">Cerrar sesión</button>
                        <button className="boton-inscripcion">Tabla Inscripción</button>
                        <button className="boton-grupos">Tabla Grupos</button>
                        <button className="boton-talleres">Tabla Talleres</button>
                    </div>
                        
                    <input
                        type="text"
                        placeholder="Escribe lo que necesites buscar"
                        className="inputFiltro input"
                    />
                    <div className="dropdown-filtro">
                        <button className="boton-dropdown">Seleccionar elemento a filtrar</button>
                        <div className="dropdown-content">
                            <a href="https://blog.hubspot.com/">Código de taller</a>
                            <a href="https://academy.hubspot.com/">Nombre de taller</a>
                        </div>
                    </div>

                    <div className="textoTitulo">Consulta de talleres</div>
                    <img
                        src="../images/prepanetLogo.png"
                        alt="logoPrepanet"
                        className="logoPrepanet"
                    />
                    <div className="consultaAlumnosCard">
                        <div className="dropdown">
                            <button className="boton-dropdown">Seleccionar campus</button>
                            <div className="dropdown-content">
                                <a href="https://blog.hubspot.com/">Monterrey</a>
                                <a href="https://academy.hubspot.com/">Culiacán</a>
                                <a href="https://www.youtube.com/user/hubspot">CDMX</a>
                                <a href="https://www.youtube.com/user/hubspot">Guadalajara</a>
                            </div>
                        </div>
                    </div>
                    <span className="textoDeReporte">
                        <span>Generar reporte:</span>
                    </span>
                </div>
            </div>
            <div>
            <table class = "styled-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>.  .  .  .  .  .</th>
                    </tr>
                </thead>
                <tbody>
                {taller?.map(({ id, data }) => (
                    <tr key={id}>
                        <td>{data.codigoTaller}</td>
                        <td>{data.nombreTaller}</td>
                        <td>{data.Description}</td>
                        <td>
                        <Button variant="outlined" onClick={() => {
                            setDataIdToBeUpdated(id);
                            setUpdatedTallerNombre(data.nombreTaller);
                            setUpdatedTallerDescripcion(data.Description);
                        }}> 
                        Editar 
                        </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </div>
    );
}

/*
Input original de filtro:


/*
<Popup trigger={<Button variant="outlined"> Editar </Button>} position="left center">
                                <div>Nombre:</div>
                                <input
                                    type="text"
                                    value={updatedTallerNombre}
                                    onChange={(e) => setUpdatedTallerNombre(e.target.value)}
                                />

                                <div>Descripción:</div>
                                <input
                                    type="text"
                                    value= {updatedTallerDescripcion}
                                    onChange={(e) => setUpdatedTallerDescripcion(e.target.value)}
                                />
                                <button onClick={updateData}> Actualizar </button>
                        </Popup>
*/