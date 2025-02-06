import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import useBookInfo from '@hooks/book/useBookInfo.tsx';

import TopBar from '@components/helper/TopBar.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';

const BookPreview = () => {
  const hasFetched = useRef(false);
  const params = useParams();
  const identifier = params.identifier;
  const { bookInfo, loading, error } = useBookInfo(identifier);


  return (
    <>
      <header>
        <TopBar pageTitle="Book Preview" />
      </header>

      <main>
        <h1>Book Preview</h1>

        <h3>Identifier: {identifier}</h3>

        {loading && <p>Loading book details...</p>}
        {error && <p>Error fetching book details.</p>}
        {bookInfo && <pre>{JSON.stringify(bookInfo, null, 2)}</pre>}
      </main>

      <footer>
        <Footer currentPage="home" />
      </footer>
    </>
  );
};

export default BookPreview;