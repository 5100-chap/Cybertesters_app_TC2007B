import Login from '../pages/Login/login'
import AdAl from '../pages/Administradores/adminAlum';
import AdTa from '../pages/Administradores/adminTalleres';
import AdGr from '../pages/Administradores/adminGrupo';
import CoAl from '../pages/Coordinadores/coordAlum';
import CoTa from '../pages/Coordinadores/coordTalleres';
import CoGr from '../pages/Coordinadores/coordGrupo';
import AlIn from '../pages/Alumnos/AlumInscr';
import Header from '../components/Header'
import Footer from '../components/Footer';

import ProtectedRoutes from './protectedRoutes';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Views = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/coordinador/Alumnos" element={<CoAl />} />
                <Route path="/coordinador/Talleres" element={<CoTa />} />
                <Route path="/coordinador/Grupos" element={<CoGr />} />
                <Route path="/administrador/Alumnos" element={<AdAl />} />
                <Route path="/administrador/Talleres" element={<AdTa />} />
                <Route path="/administrador/Grupos" element={<AdGr />} />
                <Route path="/alumno/Inscripcion" element={<AlIn />} />
            </Routes>
            <Footer />
        </Router>

    );
}

export default Views;