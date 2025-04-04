import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Nav.css'; // Importa il tuo file CSS personalizzato
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Aggiungi Link da react-router-dom per la navigazione

const CustomNavbar = function (props) {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={props.tema}
        data-bs-theme={props.tema}
      >
        <Container fluid>
          {/* Logo Netflix */}
          <Navbar.Brand as={Link} to="/">
            <img src="/NetflixLogo.jpg" width={150} alt="Netflix Logo" />
          </Navbar.Brand>

          {/* Toggle Button per dispositivi piccoli */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Contenuto della Navbar */}
          <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
            <div className="d-flex justify-content-between w-100">
              {/* Link di navigazione */}
              <Nav className="me-auto">
                {/* Modifica "Home" con Link per navigare correttamente */}
                <Nav.Link as={Link} to="/" className="text-white fw-bold">
                  Home
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  TV Shows
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  Movies
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  Recently Added
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  My List
                </Nav.Link>
              </Nav>

              {/* Nuovi link per Profilo e Settings */}
              <Nav className="d-flex align-items-center">
                <Nav.Link
                  as={Link}
                  to="/user-profile"
                  className="text-white fw-bold"
                >
                  Profilo
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/settings"
                  className="text-white fw-bold"
                >
                  Settings
                </Nav.Link>

                {/* Icone esistenti */}
                <Nav.Link href="#" className="text-white">
                  <i className="bi bi-search"></i>
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  KIDS
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  <i className="bi bi-bell"></i>
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  <i className="bi bi-person-circle"></i>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sezione inferiore con TV Shows e dropdown */}
      <div className="d-flex justify-content-between text-white bg-black p-3">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 ps-4">TV Shows</h2>

          {/* Dropdown con React-Bootstrap */}
          <Dropdown className="ms-4 mt-1">
            <Dropdown.Toggle
              variant="secondary"
              size="sm"
              className="rounded-0"
              style={{ backgroundColor: '#221f1f', border: 'none' }}
            >
              Genres
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Item href="#">Comedy</Dropdown.Item>
              <Dropdown.Item href="#">Drama</Dropdown.Item>
              <Dropdown.Item href="#">Thriller</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Icone griglia */}
        <div>
          <i className="bi bi-grid icons me-2 px-1"></i>
          <i className="bi bi-grid-3x3 icons px-1"></i>
        </div>
      </div>
    </>
  );
};

export default CustomNavbar;
