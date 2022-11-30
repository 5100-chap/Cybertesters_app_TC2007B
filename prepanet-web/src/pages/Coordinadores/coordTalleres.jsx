import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from '../../firebase/firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, setDoc, doc, where, orderBy, startAt, endAt  } from "firebase/firestore";
import { Button } from "@mui/material"

import { Helmet } from 'react-helmet';
import config from '../../settings/config.json'
const defaultTitle = config.MAIN_TITLE;


export default function CoTa() {
    const navigate = useNavigate();

    const cred2 = JSON.parse(localStorage.getItem("auth"));

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

    const [filterInscripcion, setFilterInscripcion] = useState([]);
    const [inputFiltro, setinputFiltro] = useState("");
    const [filtroDropdown, setFiltroDropdown] = useState("codigoTaller");

    const keys = ["codigoTaller", "nombreTaller", "Description"];

    useEffect(() => {
        const q = query(collection(db, "taller"));
        onSnapshot(q, (querySnapshot) => {
            setTaller(
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
            const q = query(collection(db, "taller"),
                orderBy(filtroDropdown), startAt(inputValue),
                endAt(inputValue + "\uf8ff"));
            onSnapshot(q, (querySnapshot) => {
                setTaller(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
        } else {
            setTaller(filterInscripcion);
        }
    }

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

    function logOut() {
        localStorage.setItem("auth", "");
        navigate("/");
    }

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

    return (
        <main>
            <Helmet>
                <title>
                    {defaultTitle}
                </title>
            </Helmet>
            <div>
                <link href="../css/hojaAdmins.css" rel="stylesheet" />
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
                            </select>
                        </div>

                        <div className="textoTitulo">Consulta de talleres</div>
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
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taller?.map(({ id, data }) => (
                                <tr key={id}>
                                    <td>{data.codigoTaller}</td>
                                    <td>{data.nombreTaller}</td>
                                    <td>{data.Description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}