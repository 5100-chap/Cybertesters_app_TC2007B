import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material"



export default function AlIn() {
    const [inscripcion, setInscripcion] = useState([]);

    const [updatedCampus, setUpdatedCampus] = useState("");
    const [updatedGrupo, setUpdatedGrupo] = useState("");
    const [updatedCalif, setUpdatedCalif] = useState("");
    const [updatedEstatus, setUpdatedEstatus] = useState("");

    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
    
    useEffect(() => {
        const q = query(collection(db, "inscripcion"));
        onSnapshot(q, (querySnapshot) => {
            setInscripcion(
            querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            }))
        );
        });
    }, []);
    
    const updateData = (e) => {
        e.preventDefault();

        const docRef = doc(db, "inscripcion", dataIdToBeUpdated);

        setDoc(docRef, {
            campus: updatedCampus,
            calif: updatedCalif,
            status: updatedEstatus,
            grupoID: updatedGrupo
        }, { merge: true })
        .then(() => console.log("Document updated"));

        setDataIdToBeUpdated("");

        setUpdatedCampus("");
        setUpdatedGrupo("");
        setUpdatedEstatus("");
        setUpdatedCalif("");
        
    };

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
                    </div>
                        
                    <input
                        type="text"
                        placeholder="Escribe lo que necesites buscar"
                        className="inputFiltro input"
                    />
                    <div className="dropdown-filtro">
                        <button className="boton-dropdown">Seleccionar elemento a filtrar</button>
                        <div className="dropdown-content">
                            <a href="https://blog.hubspot.com/">Matícula</a>
                            <a href="https://academy.hubspot.com/">Campus</a>
                            <a href="https://blog.hubspot.com/">Tetramestre</a>
                            <a href="https://academy.hubspot.com/">Periodo</a>
                            <a href="https://blog.hubspot.com/">Código de taller</a>
                            <a href="https://academy.hubspot.com/">Nombre de taller</a>
                            <a href="https://blog.hubspot.com/">Grupo</a>
                            <a href="https://blog.hubspot.com/">Estatus</a>
                            <a href="https://blog.hubspot.com/">Calificación</a>
                        </div>
                    </div>

                    <div className="textoTitulo">Tus cursos inscritos</div>
                    <img
                        src="../images/prepanetLogo.png"
                        alt="logoPrepanet"
                        className="logoPrepanet"
                    />
                </div>
            </div>
            <div>
            <table class = "styled-table">
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Campus</th>
                        <th>Tetramestre</th>
                        <th>Periodo</th>
                        <th>Código Taller</th>
                        <th>Nombre de taller</th>
                        <th>Grupo</th>
                        <th>Estatus</th>
                        <th>Calficación</th>
                    </tr>
                </thead>
                <tbody>
                {inscripcion?.map(({ id, data }) => (
                    <tr key={id}>
                        <td>{data.matricula}</td>
                        <td>{data.campus}</td>
                        <td>{data.tetramestre}</td>
                        <td>{data.periodo}</td>
                        <td>{data.codigoTaller}</td>
                        <td>{data.tituloTaller}</td>
                        <td>{data.grupoID}</td>
                        <td>{data.status}</td>
                        <td>{data.calif}</td>
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