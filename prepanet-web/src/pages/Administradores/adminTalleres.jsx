import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect, useRef } from "react";
import { db } from '../../firebase/firebase-config.js';
import { json, useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, setDoc, addDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material"
import { parse } from "papaparse"
import { async } from "@firebase/util";

import { Helmet } from 'react-helmet';
import config from '../../settings/config.json'
const defaultTitle = config.MAIN_TITLE;



export default function AdTa() {
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

    const insertaCSV = async (csvParsed) => {
        const datos = csvParsed.data;
        for (var i = 0; i < datos.length - 1; i++) {
            console.log(datos[i]);
            const docRef = await addDoc(collection(db, "taller"), {
                Description: datos[i].descripcion,
                nombreTaller: datos[i].tituloTaller,
                codigoTaller: datos[i].codigoTaller,
                periodo: +datos[i].periodo,
                tetramestre: +datos[i].tetramestre
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
                        <table class="tabla-editar">
                            <thead>
                                <tr>
                                    <th>Nombre de taller</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Nombre"
                                            value={updatedTallerNombre}
                                            onChange={(e) => setUpdatedTallerNombre(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input className="text-editar"
                                            type="text"
                                            placeholder="Descripción"
                                            value={updatedTallerDescripcion}
                                            onChange={(e) => setUpdatedTallerDescripcion(e.target.value)}
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
        </main>
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