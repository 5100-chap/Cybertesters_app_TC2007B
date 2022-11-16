import Login from './pages/Login/login'
import CoAl from './pages/Coordinadores/coordAlum';
import AdAl from './pages/Administradores/adminAlum';
import AdTa from './pages/Administradores/adminTalleres';
import CoTa from './pages/Coordinadores/coordTalleres';
import AlCu from './pages/Alumnos/AlumCurs';
import AlIn from './pages/Alumnos/AlumInscr';
import Header from './components/Header'
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/coordinador/Alumno" element={<CoAl />} />
        <Route path="/coordinador/Talleres" element={<CoTa />} />
        <Route path="/administrador/Alumno" element={<AdAl />} />
        <Route path="/administrador/Talleres" element={<AdTa />} />
        <Route path="/alumno/Cursos" element={<AlCu />} />
        <Route path="/alumno/Inscripcion" element={<AlIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
