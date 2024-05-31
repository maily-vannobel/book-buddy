import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/nav';
import Accueil from './pages/Accueil';
import Collections from './pages/Collections';
import Profil from './pages/Profil';
import BookComponent from './components/BookComponent';
import BooksList from './components/BooksList';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>

  );
}

export default App;