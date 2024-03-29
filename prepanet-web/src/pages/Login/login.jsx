import React from "react";
import { Helmet } from 'react-helmet'
import config from '../../settings/config.json'
import { db } from "../../firebase/firebase-config.js";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { alignProperty } from "@mui/material/styles/cssUtils";

const Title = config.Login;


export default function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        correoInst: "",
        password: ""
    });

    const inputChange = ({ target }) => {
        //localStorage.setItem("auth", "");
        const { name, value } = target
        setCredentials({
            ...credentials,
            [name]: value
        })
    }
    //const usersCollectionRef1 = collection(db, "administrador");
    //const usersCollectionRef2 = collection(db, "coordinador");
    const usersCollectionRef3 = collection(db, "alumno");

    const collectIdsAndDocs = (doc) => {
        return { id: doc.id, ...doc.data() };
    };

    const arraytoObject = (c) => {
        var res;
        for (let index = 0; index < c.length; index++) {
            var adm, coord = false;
            if (c[index].clave === "Administrador") {
                res = c[index];
                adm = true;
            }
            else if (c[index].clave === "Coordinador" && adm === false) {
                res = c[index];
                coord = true;
            }
            else if (!(adm || coord)) {
                res = c[index];
            }
        }
        return res;
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        //const q1 = query(usersCollectionRef3);
        const q2 = query(usersCollectionRef3, where("correoInst", "==", credentials.correoInst), where("password", "==", credentials.password));
        //const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2);
        if (querySnapshot2.empty) {
            alert("Usuario invalido");
        }
        else {
            const c = querySnapshot2.docs.map(collectIdsAndDocs);
            var res = arraytoObject(c);
            var user;
            if (res.clave === "Alumno") {
                user = "/alumno/Inscripcion";
            } else if (res.clave === "Coordinador") {
                user = "/coordinador/Alumnos";
            } else if (res.clave === "Administrador") {
                user = "/administrador/Alumnos";
            }
            else {
                user = "/"
            }
            res = JSON.stringify(res);
            localStorage.setItem("auth", res);
            navigate(user);
        }
    }


    return (
        <main>
             <link href="./css/StyleSheet.css" rel="stylesheet" />
            <Helmet>
                <title>
                    {Title}
                </title>
            </Helmet>
            <img
                src="./images/rectangleLogin.png"
                alt="Rectangle33561181"
                className="iniciodesesn-administradoresy-coordinadores-rectangle3356"
            />
            <img
                src="./images/prepanetLogo.png"
                alt="prepanetremovebgpreview21181"
                className="iniciodesesn-administradoresy-coordinadores-prepanetremovebgpreview2"
            />
            <div className = "pantallaLogIn">
                <div className="iniciodesesn-administradoresy-coordinadores-container">
                    <span className="iniciodesesn-administradoresy-coordinadores-text">
                        <span>Log In</span>
                    </span>
                    <span className="iniciodesesn-administradoresy-coordinadores-text2">
                        <span>E-mail</span>
                    </span>
                    <span className="iniciodesesn-administradoresy-coordinadores-text4">
                        <span>Contraseña</span>
                    </span>
                    <div className="iniciodesesn-administradoresy-coordinadores-frame11">
                        <button
                            type="button"
                            id="login-btn"
                            className="btn"
                            onClick={onSubmit}>
                            Log In
                        </button>
                    </div>
                    <input
                        type="text"
                        style={{ fontSize: "1.5rem", textAlign: "center", color: "gray"}}
                        value={credentials.correoInst}
                        onChange={inputChange}
                        name="correoInst"
                        id="usuario-login"
                        className="iniciodesesn-administradoresy-coordinadores-textinput input"
                    />
                    <input
                        type="Password"
                        style={{ fontSize: "1.5rem", textAlign: "center", color: "gray"}}
                        value={credentials.password}
                        onChange={inputChange}
                        name="password"
                        id="password-login"
                        className="iniciodesesn-administradoresy-coordinadores-textinput1 input"
                    />
                </div>
            </div>
        </main>
    );
}

