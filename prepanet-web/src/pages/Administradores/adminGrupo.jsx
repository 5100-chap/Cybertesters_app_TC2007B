import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect, useRef } from "react";
import { db } from '../../firebase/firebase-config.js';
import { json, useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, setDoc, addDoc, doc, orderBy, startAt, endAt } from "firebase/firestore";
import { Button } from "@mui/material"
import { parse } from "papaparse"
import { async } from "@firebase/util";

import { Helmet } from 'react-helmet';
import config from '../../settings/config.json'
const defaultTitle = config.MAIN_TITLE;

export default function AdGr() {
    const navigate = useNavigate();


    const cred2 = JSON.parse(localStorage.getItem("auth"));

    const [inscripcion, setInscripcion] = useState([]);

    const [updatedTallerNombre, setUpdatedTallerNombre] = useState("");
    const [updatedNumAlumnos, setUpdatedNumAlumnos] = useState("");
    const [updatedFechaIn, setUpdatedFechaIn] = useState("");
    const [updatedFechaFin, setUpdatedFechaFin] = useState("");

    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
    const [filterInscripcion, setFilterInscripcion] = useState([]);
    const [inputFiltro, setinputFiltro] = useState("");
    const [filtroDropdown, setFiltroDropdown] = useState("matricula");

    const keys = ["codigoTaller", "nombre", "grupoId", "campus", "periodo", "numAlumnos", "fechaInscripcionIn", "fechaInscripcionFin"];


    useEffect(() => {
        const q = query(collection(db, "grupo"));
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
        if (getSearch.length > 0 && filtroDropdown.length > 0) {
            const inputValue = getSearch.replace(/\W/g, "");
            const q = query(collection(db, "grupo"),
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

        const docRef = doc(db, "grupo", dataIdToBeUpdated);

        setDoc(docRef, {
            nombre: updatedTallerNombre,
            numAlumnos: updatedNumAlumnos,
            fechaInscripcionIn: updatedFechaIn,
            fechaInscripcionFin: updatedFechaFin
        }, { merge: true })
            .then(() => console.log("Document updated"));

        setDataIdToBeUpdated("");

        setUpdatedTallerNombre("");
        setUpdatedNumAlumnos("");
        setUpdatedFechaIn("");
        setUpdatedFechaFin("");

    };

    const insertaCSV = async (csvParsed) => {
        const datos = csvParsed.data;
        for (var i = 0; i < datos.length - 1; i++) {
            console.log(datos[i]);
            const docRef = await addDoc(collection(db, "grupo"), {
                campus: datos[i].campus,
                grupoId: datos[i].grupo,
                nombre: datos[i].tituloTaller,
                numAlumnos: +datos[i].numeroAlumnos,
                codigoTaller: datos[i].codigoTaller,
                periodo: +datos[i].periodo,
                fechaInscripcionIn: datos[i].fechaInscripcionIn,
                fechaInscripcionFin: datos[i].fechaInscripcionFin
            });
        }
    };

    const subirCSV = async () => {
        const file = document.getElementById('archivoCSV').files[0];
        const textFile = await file.text();

        const result = parse(textFile, {
            header: true
        });
        insertaCSV(result);
    };

    function tableToCSV() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            var csvrow = [];
            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                csvrow.push(cols[j].innerHTML);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }

        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file 
        downloadCSVFile(csv_data);

    };

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        const CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "GfG.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
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
                {dataIdToBeUpdated ? (
                    <div>
                        <table classname="tabla-editar">
                            <thead>
                                <tr>
                                    <th>Nombre de taller</th>
                                    <th>Numero de alumnos</th>
                                    <th>Fecha de inicio</th>
                                    <th>Fecha de fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Nombre de taller"
                                            value={updatedTallerNombre}
                                            onChange={(e) => setUpdatedTallerNombre(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Numero de alumno"
                                            value={updatedNumAlumnos}
                                            onChange={(e) => setUpdatedNumAlumnos(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Fecha de Inicio"
                                            value={updatedFechaIn}
                                            onChange={(e) => setUpdatedFechaIn(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Fecha de Fin"
                                            value={updatedFechaFin}
                                            onChange={(e) => setUpdatedFechaFin(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <Button className="boton-editar" variant="outlined" style={{ maxWidth: '100px', maxHeight: '25px', minWidth: '100px', minHeight: '25px' }}
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
                            <span>{cred2.matricula}</span>
                        </span>
                        <img
                            src="../images/perfil11381-dvdt-200h.png"
                            alt="imgPerfil"
                            className="imagenDePerfil"
                        />
                        <div className="botones-header">
                            <button className="boton-cerrarsesion" onClick={logOut}>Cerrar sesión</button>
                            <button className="boton-inscripcion" onClick={() => {
                                navigate("/administrador/Alumnos");
                            }}>Tabla Inscripción</button>
                            <button className="boton-grupos" onClick={() => {
                                navigate("/administrador/Grupos");
                            }}>Tabla Grupos</button>
                            <button className="boton-talleres" onClick={() => {
                                navigate("/administrador/Talleres");
                            }}>Tabla Talleres</button>
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
                                <option className="dropdown-content" value={keys[0]}>Código de taller</option>
                                <option className="dropdown-content" value={keys[1]}>Nombre de taller</option>
                                <option className="dropdown-content" value={keys[3]}>Campus</option>
                                <option className="dropdown-content" value={keys[5]}>Periodo</option>
                            </select>
                        </div>

                        <div className="textoTitulo">Consulta de grupos</div>
                        <img
                            src="../images/prepanetLogo.png"
                            alt="logoPrepanet"
                            className="logoPrepanet"
                        />
                        <div className="consultaAlumnosCard">
                            <div className="dropdown">
                                <button className="boton-dropdown" onClick={tableToCSV}>Descargar datos de tabla</button>
                            </div>
                        </div>

                        <div className="subirArchivoCard">
                            <input type="file" id="archivoCSV" />
                        </div>
                        <button className="boton-subir" onClick={subirCSV}>Subir datos</button>

                        <span className="textoDeReporte">
                            <span>Generar reporte:</span>
                        </span>
                    </div>
                </div>
                <div>
                    <table class="styled-table">
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
                                <th>.  .  .  .  .  .</th>
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
                                    <td>
                                        <Button variant="outlined" onClick={() => {
                                            setDataIdToBeUpdated(id);

                                            setUpdatedTallerNombre(data.nombre);
                                            setUpdatedNumAlumnos(data.numAlumnos);
                                            setUpdatedFechaIn(data.fechaInscripcionIn);
                                            setUpdatedFechaFin(data.fechaInscripcionFin);
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