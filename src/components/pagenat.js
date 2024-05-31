import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagenat = ({ handlePageChange, pageCount }) => {
  const handlePageClick = ({ selected }) => {
    handlePageChange(selected + 1);
  };

  return (
    <>
      <ReactPaginate
       
        nextLabel="التالي >"
        marginPagesDisplayed={0}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< السابق"
        renderOnZeroPageCount={null}
        containerClassName='pagination justify-content-center p-3'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-link'
        nextClassName='page-link'
        breakClassName='page-link'
        activeClassName='active'
        
      />
    </>
  );
}

export default Pagenat;
