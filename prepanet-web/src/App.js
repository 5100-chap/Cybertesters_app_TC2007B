import Login from './pages/login'
import CoAl from './pages/coordAlum';
import AdAl from './pages/adminAlum';
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
        <Route path="/administrador/Alumno" element={<AdAl />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
