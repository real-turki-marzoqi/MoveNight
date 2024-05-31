import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const MoveDetailes = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Accessing the movie id from the URL

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ar`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDllY2FlZTY5MTlmMzNiNTEzMmIzNzcyYmI4YjNlYiIsInN1YiI6IjY2NGI3YTc0ZTJlYTA3NDNhNDFkZDJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TGUziC_Zg8Kip6hKQHcS18RRbf4I4crqN9DLyr4MrVA',
            Accept: 'application/json',
          },
          cancelToken: source.token,
        });
        setMovie(response.data);
        console.log(response.data)
        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error);
          setLoading(false); // Set loading to false in case of error
        }
      }
    };

    fetchMovie();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [id]);

  if (loading) {
    return <div>   <Spinner animation="border" variant="dark" /></div>;
  }

  if (error || !movie) {
    return <div>Error: {error ? error.message : 'Something went wrong.'}</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className="MoveDetailes-main m-3">
      <Row className="mt-3 MoveDetailes-img-text-row">
        <Col className="MoveDetailes-img-col" lg={4} md={4} xs={12} sm={12}>
          <img className="poster shadow-box" src={posterUrl} alt={movie.original_title} style={{ width: '50%' }} />
        </Col>
        <Col className="MoveDetailes-text-col mt-4 " lg={7} md={7} xs={12} sm={12}>
          <div className="mt-4 mr-2">
            <h1 className="poster-text">{movie.title}</h1>
            <h5 className="poster-text">اللغة: {movie.original_language}</h5>
            <h5 className="poster-text">النوع: {movie.genres && movie.genres.length > 0 ? movie.genres[0].name : 'N/A'}</h5>
            <h5 className="poster-text">التقييم: {Number(movie.vote_average.toFixed(1))} <i className="fas fa-star"></i></h5>
            <h5 className="poster-text">تاريخ العرض: {movie.release_date}</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
  <Col className="move-ditales-col" lg={12} md={12} xs={12} sm={12}>
    <h5>القصة</h5>
    <p>{movie.overview}</p>
   
  </Col>
</Row>
      <Row>
        <Col lang="6">
          <Link to={"/"}>
          <Button variant="dark">الرئيسية</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default MoveDetailes;
