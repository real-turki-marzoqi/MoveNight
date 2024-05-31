import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from './components/NavBar';
import MoveList from './components/MoveList';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoveDetailes from './components/MoveDetailes';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = '';
        if (!searchQuery.trim()) {
          // If search query is empty, fetch popular movies
          url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ar-US&page=${currentPage}&sort_by=popularity.desc`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ar-US&page=${currentPage}&query=${encodeURIComponent(
            searchQuery
          )}`;
        }

        const options = {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDllY2FlZTY5MTlmMzNiNTEzMmIzNzcyYmI4YjNlYiIsInN1YiI6IjY2NGI3YTc0ZTJlYTA3NDNhNDFkZDJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TGUziC_Zg8Kip6hKQHcS18RRbf4I4crqN9DLyr4MrVA',
            Accept: 'application/json',
          },
        };
        const response = await axios.get(url, options);
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <NavBar setSearchQuery={setSearchQuery} />
        </Col>
      </Row>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MoveList
                  movies={movies}
                  handlePageChange={handlePageChange}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/move/:id" element={<MoveDetailes />} />
          </Routes>
        </BrowserRouter>
      </Container>
   
      
    </div>
  );
}

export default App;
