import React from "react";
import { Helmet } from 'react-helmet'
import config from '../../settings/config.json'
import { db } from "../../firebase/firebase-config.js";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Title = config.Login;


export default function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        correoInst: "",
        password: ""
    });

    const inputChange = ({ target }) => {
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
        const q2 = query(usersCollectionRef3, where("correoInstitucional", "==", credentials.correoInst), where("password", "==", credentials.password));
        const q3 = query(usersCollectionRef3, where("correoInst", "==", credentials.correoInst), where("password", "==", credentials.password));
        //const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2);
        const querySnapshot3 = await getDocs(q3);
        if (querySnapshot2.empty) {
            if (querySnapshot3.empty) {
                alert("Usuario invalido")
            }
            else {
                const c = querySnapshot3.docs.map(collectIdsAndDocs);
                var res = arraytoObject(c);
                res = JSON.stringify(res);
                console.log(res);
                localStorage.setItem("auth", res);
                navigate("/coordinador/Alumnos");
            }
        }
        else {
            const c = querySnapshot3.docs.map(collectIdsAndDocs);
            var res = arraytoObject(c);
            res = JSON.stringify(res);
            console.log(res); 
            localStorage.setItem("auth", res);
            navigate("/coordinador/Alumnos");
        }
    }


    return (
        <main>
            <Helmet>
                <title>
                    {Title}
                </title>
            </Helmet>
            <div>
                <link href="./css/StyleSheet.css" rel="stylesheet" />
                <img
                    src="./images/rectangleLogin.png"
                    alt="Rectangle33561181"
                    className="iniciodesesn-administradoresy-coordinadores-rectangle3356"
                />
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
                            Log-in
                        </button>
                    </div>
                    <input
                        type="text"
                        value={credentials.correoInst}
                        onChange={inputChange}
                        name="correoInst"
                        id="usuario-login"
                        className="iniciodesesn-administradoresy-coordinadores-textinput input"
                    />
                    <input
                        type="Password"
                        value={credentials.password}
                        onChange={inputChange}
                        name="password"
                        id="password-login"
                        className="iniciodesesn-administradoresy-coordinadores-textinput1 input"
                    />
                    <img
                        src="./images/prepanetLogo.png"
                        alt="prepanetremovebgpreview21181"
                        className="iniciodesesn-administradoresy-coordinadores-prepanetremovebgpreview2"
                    />
                </div>
            </div>
        </main>
    );
}

