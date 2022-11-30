import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, setDoc, doc, where, orderBy, startAt, endAt } from "firebase/firestore";
import { Button, darkScrollbar } from "@mui/material"

import { Helmet } from 'react-helmet';
import config from '../../settings/config.json'
const defaultTitle = config.MAIN_TITLE;



export default function CoGr() {
    const navigate = useNavigate();

    const cred2 = JSON.parse(localStorage.getItem("auth"));

    const [inscripcion, setInscripcion] = useState([]);
    const [filterInscripcion, setFilterInscripcion] = useState([]);
    const [inputFiltro, setinputFiltro] = useState("");
    const [filtroDropdown, setFiltroDropdown] = useState("codigoTaller");

    const keys = ["codigoTaller", "nombre", "grupoId", "campus", "periodo", "numAlumnos", "fechaInscripcionIn", "fechaInscripcionFin"];



    useEffect(() => {
        let credential = JSON.parse(localStorage.getItem("auth"))
        const campus = credential.campus;
        const q = query(collection(db, "grupo"), where("campus", "==", campus));
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
        if (getSearch.length > 0 && filtroDropdown.length > 0) {
            var inputValue, q;
            if (filtroDropdown == keys[4]) {
                inputValue = parseInt(getSearch);
                q = query(collection(db, "grupo"),
                    where("campus", "==", cred.campus),
                    orderBy(filtroDropdown), startAt(inputValue),
                    endAt(inputValue));
            } else {
                inputValue = getSearch.replace(/\W/g, "");
                q = query(collection(db, "grupo"),
                    where("campus", "==", cred.campus),
                    orderBy(filtroDropdown), startAt(inputValue),
                    endAt(inputValue + "\uf8ff"));
            }
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
                                navigate("/coordinador/Alumnos");
                            }}>Tabla Inscripción</button>
                            <button className="boton-grupos" onClick={() => {
                                navigate("/coordinador/Grupos");
                            }}>Tabla Grupos</button>
                            <button className="boton-talleres" onClick={() => {
                                navigate("/coordinador/Talleres");
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
                                <option className="dropdown-content" value={keys[2]}>Grupo</option>
                                <option className="dropdown-content" value={keys[4]}>Periodo</option>
                            </select>
                        </div>
                        <div className="textoTitulo">Consulta de grupos</div>
                        <img
                            src="../images/prepanetLogo.png"
                            alt="logoPrepanet"
                            className="logoPrepanet"
                        />
                        <div className="consultaAlumnosCard">
                            <button className="boton-dropdown" onClick={tableToCSV}>Descargar datos de tabla</button>
                        </div>
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