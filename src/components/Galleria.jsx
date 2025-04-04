import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

const FilmGallery = ({ title, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedMovie, setSelectedMovie] = useState(null); // Per gestire il film selezionato

  const getSlidesPerView = () => {
    if (windowWidth < 576) return 1;
    if (windowWidth < 992) return 3;
    return 5;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSlidesPerView(getSlidesPerView());
  }, [windowWidth]);

  useEffect(() => {
    const fetchMovies = () => {
      fetch(`http://www.omdbapi.com/?apikey=73815f65&s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'True') {
            setMovies(data.Search);
          } else {
            setError('Nessun film trovato.');
          }
        })
        .catch((error) => {
          setError('Errore durante il recupero dei dati.');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMovies();
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const slides = [];
  for (let i = 0; i < movies.length; i += slidesPerView) {
    slides.push(movies.slice(i, i + slidesPerView));
  }

  const handleClick = (movieID) => {
    // Se il film è già selezionato, lo deselezioniamo, altrimenti lo selezioniamo
    setSelectedMovie(selectedMovie === movieID ? null : movieID);
  };

  return (
    <div className="film-gallery">
      <h3 className="text-white">{title}</h3>
      <Container fluid="true" style={{ padding: 0 }}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Carousel
              activeIndex={activeMovieIndex}
              onSelect={(selectedIndex) => setActiveMovieIndex(selectedIndex)}
              interval={null}
              key={slidesPerView}
            >
              {slides.map((group, index) => (
                <Carousel.Item key={index} className="bg-black text-white">
                  <Row className="d-flex justify-content-center">
                    {group.map((movie) => (
                      <Col
                        key={movie.imdbID}
                        xs={12} // 1 colonna per smartphone
                        sm={4} // 3 colonne per schermi più grandi di 576px
                        md={4} // 3 colonne per tablet
                        lg={2} // 5 colonne per desktop
                      >
                        <div
                          className="carousel-item-wrapper position-relative"
                          onClick={() => handleClick(movie.imdbID)} // Gestiamo il click per il toggle
                          style={{
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            className="d-block w-100 img-fluid"
                            src={movie.Poster}
                            alt={movie.Title}
                            style={{
                              maxHeight: '300px',
                              minHeight: '200px',
                              maxWidth: '300px',
                              minWidth: '200px',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease-in-out',
                            }}
                          />
                          {/* Effetto hover per il testo */}
                          <div
                            className={`carousel-item-text position-absolute w-100 text-center p-3 text-white ${
                              selectedMovie === movie.imdbID
                                ? 'd-block'
                                : 'd-none'
                            }`}
                            style={{
                              bottom: 0,
                              left: 0,
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              width: '100%',
                            }}
                          >
                            <h5>{movie.Title}</h5>
                            <p>{movie.Year}</p>
                          </div>
                          {/* Hover per mostrare il contenitore con il testo */}
                          <div
                            className="carousel-item-hover position-absolute w-100 text-center p-3 text-white d-flex align-items-center justify-content-center"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              borderRadius: '8px',
                            }}
                          >
                            <div className="hover-text">
                              <h5>{movie.Title}</h5>
                              <p>{movie.Year}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilmGallery;
