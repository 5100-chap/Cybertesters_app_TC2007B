import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { Button, darkScrollbar } from "@mui/material"



export default function CoGr() {
    const [inscripcion, setInscripcion] = useState([]);
    
    useEffect(() => {
        const q = query(collection(db, "grupo"));
        onSnapshot(q, (querySnapshot) => {
            setInscripcion(
            querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            }))
        );
        });
    }, []);
    

    return(
        <div>
            <link href="../css/hojaAdminInscripcion.css" rel="stylesheet" />
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
                            <a href="https://blog.hubspot.com/">Campus</a>
                            <a href="https://academy.hubspot.com/">Periodo</a>
                        </div>
                    </div>

                    <div className="textoTitulo">Consulta de grupos</div>
                    <img
                        src="../images/prepanetLogo.png"
                        alt="logoPrepanet"
                        className="logoPrepanet"
                    />
                    <div className="consultaAlumnosCard">
                        <button className="boton-dropdown">Nombre de campus</button>
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
                        <th>Código Taller</th>
                        <th>Nombre de taller</th>
                        <th>Grupo</th>
                        <th>Campus</th>
                        <th>Periodo</th>
                        <th>Número de alumnos</th>
                        <th>Inicio de inscripción</th>
                        <th>Fin de inscripción</th>
                    </tr>
                </thead>
                <tbody>
                {inscripcion?.map(({ id, data }) => (
                    <tr key={id}>
                        <td>{data.codigoTaller}</td>
                        <td>{data.nombre}</td>
                        <td>{data.grupoId}</td>
                        <td>{data.campus}</td>
                        <td>{data.periodo}</td>
                        <td>{data.numAlumnos}</td>
                        <td>{data.fechaInscripcionIn}</td>
                        <td>{data.fechaInscripcionFin}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </div>
    );
}

/*
<th>Matrícula</th>
<th>Nombre</th>
<th>Campus</th>
<th>Correo Institucional</th>
<th>Contraseña</th>
*/