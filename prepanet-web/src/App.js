import Login from './pages/Login/login'
/*
import CoAl from './pages/Coordinadores/coordAlum';
import AdAl from './pages/Administradores/adminAlum';
import AdTa from './pages/Administradores/adminTalleres';
import CoTa from './pages/Coordinadores/coordTalleres';
import AlCu from './pages/Alumnos/AlumCurs';
import AlIn from './pages/Alumnos/AlumInscr';
*/
import Header from './components/Header'
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
