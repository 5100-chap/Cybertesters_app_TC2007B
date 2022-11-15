import Login from './pages/login'
import CoAl from './pages/coordAlum';
import AdAl from './pages/adminAlum';
import AdTa from './pages/adminTalleres';
import CoTa from './pages/coordTalleres';
import AlCu from './pages/AlumCurs';
import AlIn from './pages/AlumInscr';
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
