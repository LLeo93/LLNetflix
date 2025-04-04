import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CustomNavbar from './components/CustomNavbar'; // Importa la tua CustomNavbar
import Footer from './components/Footer';
import FilmGallery from './components/Galleria';
import Settings from './components/Settings';
import UserProfile from './components/Profilo'; // Importa il componente Profilo

function App() {
  return (
    <Router>
      <main className="bg-black">
        {/* Usa CustomNavbar al posto della navbar statica */}
        <CustomNavbar tema="black" />

        <div className="container mt-5">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-white my-4">Film In Evidenza</h1>
                  {/* Galleria di Harry Potter */}
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery
                      title="Harry Potter"
                      searchTerm="Harry Potter"
                    />
                  </div>
                  {/* Galleria di Lord of the Rings */}
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery
                      title="Lord of the Rings"
                      searchTerm="Lord of the Rings"
                    />
                  </div>
                  {/* Galleria di Star Wars */}
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery title="Star Wars" searchTerm="Star Wars" />
                  </div>
                </>
              }
            />

            {/* Settings Page */}
            <Route path="/settings" element={<Settings />} />

            {/* Aggiungi la route per il Profilo */}
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
