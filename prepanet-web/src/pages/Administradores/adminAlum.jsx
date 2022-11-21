import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material"


/*
            <input className= "text-editar"
                type="text"
                placeholder="Campus"
                value={updatedCampus}
                onChange={(e) => setUpdatedCampus(e.target.value)}
            />
            <input className= "text-editar"
                type="text"
                placeholder="Grupo"
                value={updatedGrupo}
                onChange={(e) => setUpdatedGrupo(e.target.value)}
            />
            <input className= "text-editar"
                type="text"
                placeholder="Estatus"
                value={updatedEstatus}
                onChange={(e) => setUpdatedEstatus(e.target.value)}
            />
            <input className= "text-editar"
                type="text"
                placeholder="Calificación"
                value={updatedCalif}
                onChange={(e) => setUpdatedCalif(e.target.value)}
            />
*/

export default function AdAl() {
    const [inscripcion, setInscripcion] = useState([]);

    const [updatedMatricula, setUpdatedMatricula] = useState("");
    const [updatedTallerCodigo, setUpdatedTallerCodigo] = useState("");
    const [updatedTallerNombre, setUpdatedTallerNombre] = useState("");
    const [updatedCampus, setUpdatedCampus] = useState("");
    const [updatedGrupo, setUpdatedGrupo] = useState("");
    const [updatedCalif, setUpdatedCalif] = useState("");
    const [updatedEstatus, setUpdatedEstatus] = useState("");
    const [updatedPeriodo, setUpdatedPeriodo] = useState("");
    const [updatedTetramestre, setUpdatedTetramestre] = useState("");

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
            {dataIdToBeUpdated ? (
            <div>
            <table class = "tabla-editar">
            <thead>
                <tr>
                    <th>Campus</th>
                    <th>Grupo</th>
                    <th>Estatus</th>
                    <th>Calificación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                    <input className= "text-editar"
                        type="text"
                        placeholder="Campus"
                        value={updatedCampus}
                        onChange={(e) => setUpdatedCampus(e.target.value)}
                    />
                    </th>
                    <th>
                    <input className= "text-editar"
                        type="text"
                        placeholder="Grupo"
                        value={updatedGrupo}
                        onChange={(e) => setUpdatedGrupo(e.target.value)}
                    />
                    </th>
                    <th>
                    <input className= "text-editar"
                        type="text"
                        placeholder="Estatus"
                        value={updatedEstatus}
                        onChange={(e) => setUpdatedEstatus(e.target.value)}
                    />
                    </th>
                    <th>
                    <input className= "text-editar"
                        type="text"
                        placeholder="Calificación"
                        value={updatedCalif}
                        onChange={(e) => setUpdatedCalif(e.target.value)}
                    />
                    </th>
                    <th>
                        <Button className="boton-editar" variant="outlined" style={{maxWidth: '100px', maxHeight: '25px', minWidth: '100px', minHeight: '25px'}}
                            onClick={updateData}>Actualizar
                        </Button>
                    </th>
                </tr>


            </tbody>
            </table>
            <div className="editar">
            </div>
        </div>
        ) : (<></>)}

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

                    <div className="textoTitulo">Consulta de alumnos inscritos</div>
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
                        <th>Matrícula</th>
                        <th>Campus</th>
                        <th>Tetramestre</th>
                        <th>Periodo</th>
                        <th>Código Taller</th>
                        <th>Nombre de taller</th>
                        <th>Grupo</th>
                        <th>Estatus</th>
                        <th>Calficación</th>
                        <th>.  .  .  .  .  .</th>
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
                        <td>
                        <Button variant="outlined" onClick={() => {
                            setDataIdToBeUpdated(id);

                            setUpdatedCampus(data.campus);
                            setUpdatedGrupo(data.grupoID);
                            setUpdatedEstatus(data.status);
                            setUpdatedCalif(data.calif);
                            
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
<th>Matrícula</th>
<th>Nombre</th>
<th>Campus</th>
<th>Correo Institucional</th>
<th>Contraseña</th>
*/