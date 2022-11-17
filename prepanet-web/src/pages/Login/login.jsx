import React from "react";
import { Helmet } from 'react-helmet'
import config from '../../settings/config.json'
import db from "../../firebase/firebase-config.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const Title = config.Login;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            correoInst: "",
            password: ""
        };
        this.usersCollectionRef1 = collection(db, "alumno");
        this.usersCollectionRef2 = collection(db, "administrador");
        this.usersCollectionRef3 = collection(db, "coordinador");
    }

    inputChange = ({ target }) => {
        const { name, value } = target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    onSubmit = async () => {
        const q = query(this.usersCollectionRef1, where("correoInst", "==", this.state.correoInst), where("password", "==", this.state.password));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("Nel pastel")
        } else {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }
    }

    render() {
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
                                onClick={this.onSubmit}>
                                Log-in
                            </button>
                        </div>
                        <input
                            type="text"
                            value={this.state.correoInst}
                            onChange={this.inputChange}
                            name="correoInst"
                            id="usuario-login"
                            className="iniciodesesn-administradoresy-coordinadores-textinput input"
                        />
                        <input
                            type="Password"
                            value={this.state.password}
                            onChange={this.inputChange}
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
}
export default Login;