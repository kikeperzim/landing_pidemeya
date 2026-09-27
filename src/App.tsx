import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Complaints from './pages/Complaints';
import DataAnnex from './pages/DataAnnex';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contactanos" element={<Contact />} />
            <Route path="privacidad" element={<Privacy />} />
            <Route path="terminos" element={<Terms />} />
            <Route path="libro-de-reclamaciones" element={<Complaints />} />
            <Route path="anexo-datos" element={<DataAnnex />} />
            {/* Default fallback route */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
