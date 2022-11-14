import React from 'react';

class AdTa extends React.Component {
    render() {
        return <div>
            <link href="../css/hojaAdmins.css" rel="stylesheet" />
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
                    <button className="boton-cerrarsesion">Cerrar sesión</button>
                    <input
                        type="text"
                        placeholder="Escribe lo que necesites buscar"
                        className="inputFiltro input"
                    />
                    <div className="textoTitulo">Consulta de alumnos</div>
                    <img
                        src="../images/prepanetLogo.png"
                        alt="logoPrepanet"
                        className="logoPrepanet"
                    />
                    <div className="consultaAlumnosCard">
                        <div className="dropdown">
                            <button>Seleccionar campus</button>
                            <div className="dropdown-content">
                                <a href="https://blog.hubspot.com/">Monterrey</a>
                                <a href="https://academy.hubspot.com/">Culiacán</a>
                                <a href="https://www.youtube.com/user/hubspot">CDMX</a>
                                <a href="https://www.youtube.com/user/hubspot">Guadalajara</a>
                            </div>
                        </div>
                    </div>
                    <span className="textoDeReporte">
                        <span>Generar reporte:</span>
                    </span>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nombre</th>
                            <th>Campus</th>
                            <th>Correo Institucional</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
            ;

    }
}

export default AdTa;