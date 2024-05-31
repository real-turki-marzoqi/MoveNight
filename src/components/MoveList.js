// MoveList.js
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MoveCard from './MovieCard';
import Pagenat from "./pagenat"

const MoveList = ({ movies, handlePageChange, pageCount }) => {
  return (
    <Container>
      <Row className="moveList mt-2 ">
        {movies.length >= 1 ? (
          movies.map((mov) => (
            <Col key={mov.id} className="move-Card-list mt-3" lg={3} md={4} sm={5} xs={5}>
              <p className="poster-detailes">
                {Number(mov.vote_average.toFixed(1))} <i className="fas fa-star"></i>
              </p>
              <p className="poster-detailes1">{mov.release_date}</p>
              <MoveCard mov={mov} />
            </Col>
          ))
        ) : (
          <></>
        )}
        <Row>
          <Pagenat handlePageChange={handlePageChange} pageCount={pageCount} />
        </Row>
      </Row>
    </Container>
  );
};

export default MoveList;
