import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, setDoc, doc, where, orderBy, startAt, endAt } from "firebase/firestore";
import { Button } from "@mui/material"


import { Helmet } from 'react-helmet';
import config from '../../settings/config.json'
const defaultTitle = config.MAIN_TITLE;

export default function AlIn() {
    const navigate = useNavigate();

    const cred2 = JSON.parse(localStorage.getItem("auth"));

    const [inscripcion, setInscripcion] = useState([]);

    const [updatedCampus, setUpdatedCampus] = useState("");
    const [updatedGrupo, setUpdatedGrupo] = useState("");
    const [updatedCalif, setUpdatedCalif] = useState("");
    const [updatedEstatus, setUpdatedEstatus] = useState("");

    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

    const [filterInscripcion, setFilterInscripcion] = useState([]);
    const [inputFiltro, setinputFiltro] = useState("");
    const [filtroDropdown, setFiltroDropdown] = useState("matricula");

    const keys = ["matricula", "campus", "tetramestre", "periodo", "codigoTaller", "tituloTaller", "grupoID", "status", "calif"];

    useEffect(() => {
        let credential = JSON.parse(localStorage.getItem("auth"))
        const matricula = credential.matricula;
        const q = query(collection(db, "inscripcion"), where("matricula", "==", matricula));
        onSnapshot(q, (querySnapshot) => {
            setInscripcion(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
            setFilterInscripcion(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }, []);

    const handleSearch = (e) => {
        const getSearch = e.target.value;
        setinputFiltro(getSearch);
        let cred = JSON.parse(localStorage.getItem("auth"))
        const matri = cred.matricula;
        if (getSearch.length > 0 && filtroDropdown.length > 0) {
            const inputValue = getSearch.replace(/\W/g, "");
            const q = query(collection(db, "inscripcion"),
                where("matricula", "==", matri),
                orderBy(filtroDropdown), startAt(inputValue),
                endAt(inputValue + "\uf8ff"));
            onSnapshot(q, (querySnapshot) => {
                setInscripcion(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
        } else {
            setInscripcion(filterInscripcion);
        }
    }


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

    function logOut() {
        localStorage.setItem("auth", "");
        navigate("/");
    }

    return (
        <main>
            <Helmet>
                <title>
                    {defaultTitle}
                </title>
            </Helmet>
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
                            <span>{cred2.matricula}</span>
                        </span>
                        <img
                            src="../images/perfil11381-dvdt-200h.png"
                            alt="imgPerfil"
                            className="imagenDePerfil"
                        />
                        <div className="botones-header">
                            <button className="boton-cerrarsesion" onClick={logOut}>Cerrar sesión</button>
                        </div>

                        <input
                            type="text"
                            placeholder="Escribe lo que necesites buscar"
                            className="inputFiltro input"
                            value={inputFiltro}
                            onChange={handleSearch}
                        />
                        <div className="dropdown-filtro">
                            <select className="boton-dropdown"
                                onChange={(e) => {
                                    setFiltroDropdown(e.target.value);
                                }
                                }>
                                <option className="dropdown-content" value={keys[0]}>Matícula</option>
                                <option className="dropdown-content" value={keys[1]}>Campus</option>
                                <option className="dropdown-content" value={keys[2]}>Tetramestre</option>
                                <option className="dropdown-content" value={keys[3]}>Periodo</option>
                                <option className="dropdown-content" value={keys[4]}>Código de taller</option>
                                <option className="dropdown-content" value={keys[5]}>Nombre de taller</option>
                                <option className="dropdown-content" value={keys[6]}>Grupo</option>
                                <option className="dropdown-content" value={keys[7]}>Estatus</option>
                                <option className="dropdown-content" value={keys[8]}>Calificación</option>
                            </select>
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
                    <table class="styled-table">
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

        </main>
    );
}

/*
<th>Matrícula</th>
<th>Nombre</th>
<th>Campus</th>
<th>Correo Institucional</th>
<th>Contraseña</th>
*/