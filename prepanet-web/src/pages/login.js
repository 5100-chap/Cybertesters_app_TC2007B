import React from 'react';

class Login extends React.Component {
    render() {
        return <div>
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
                    <span className="iniciodesesn-administradoresy-coordinadores-text6">
                        <span>LOG IN</span>
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="E-mail"
                    className="iniciodesesn-administradoresy-coordinadores-textinput input"
                />
                <input
                    type="text"
                    placeholder="Contraseña"
                    className="iniciodesesn-administradoresy-coordinadores-textinput1 input"
                />
                <img
                    src="./images/prepanetLogo.png"
                    alt="prepanetremovebgpreview21181"
                    className="iniciodesesn-administradoresy-coordinadores-prepanetremovebgpreview2"
                />
            </div>
        </div>
            ;

    }
}

export default Login;