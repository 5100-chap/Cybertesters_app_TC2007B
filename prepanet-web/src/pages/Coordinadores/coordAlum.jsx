import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.js";
import { collection, query, onSnapshot, setDoc, doc, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import { Navigate } from "react-router";



export default function CoAl() {
    const navigate = useNavigate();
    
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
        let credential = JSON.parse(localStorage.getItem("auth"))
        const campus = credential.campus;
        const q = query(collection(db, "inscripcion"), where("campus", "==", campus));
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
    
    function logOut(){
        localStorage.setItem("auth", "");
        navigate("/");
    }

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

                        <button className="boton-cerrarsesion" onClick={logOut}>Cerrar sesión</button>

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
                    <button className="boton-dropdown" onClick={tableToCSV}>Descargar datos de tabla</button>
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