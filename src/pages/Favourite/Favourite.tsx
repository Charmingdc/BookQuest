import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { CiTrash } from 'react-icons/ci';
import TopBar from '@components/helper/Navigation/TopBar';
import SideBar from '@components/helper/Navigation/SideBar';
import Footer from '@components/helper/Navigation/Footer';
import FavouriteBooksLoader from '@components/favourite-books/FavouriteBooksLoader';
import useFavouriteBooks from '@hooks/book/useFavouriteBooks';
import { FavouriteBooksProps } from '@types/book/types';

interface FavouriteBooksPropsWithId extends FavouriteBooksProps {
  id: string;
}

import './index.css';

const Favourite = () => {
  const [clickedBook, setClickedBook] = useState<FavouriteBooksPropsWithId | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const { favouriteBooks, isLoading, isError, error } = useFavouriteBooks();

  const handleBookClick = (favBook: FavouriteBooksPropsWithId) => {
    setClickedBook(favBook);
    setOpenModal(true);
  };

  const handleRemoveFavourite = () => {
    setOpenModal(false);
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (clickedBook) navigate(`/book/${clickedBook.isbn}`);
  };

  return (
   <>
    <header>
     <TopBar pageTitle="Favourite Books" />
    </header>

    <main>
     <aside>
      <SideBar currentPage="favourites" />
     </aside>

     <section className="favourite-books-container">
       {isLoading ? (
         <FavouriteBooksLoader />
       ) : isError ? (
         <p>Error loading favourite books: {error}</p>
       ) : favouriteBooks.length > 0 ? (
         favouriteBooks.map((favBook: FavouriteBooksPropsWithId) => (
           <div
             className="favourite-books"
             key={favBook.id}
             onClick={() => handleBookClick(favBook)}>
             <div className="book-image">
              <img src={favBook.cover} alt={favBook.title} />
             </div>
             <p>{favBook.title}</p>
           </div>
         ))
       ) : (
         <h2>No favourite books :)</h2>
       )}

       {openModal && clickedBook && (
         <div className="clicked-book-modal-wrapper" onClick={() => setOpenModal(false)}>
           <div
             className="clicked-book-modal"
             onClick={(e) => e.stopPropagation()}>
             <div className="clicked-book-details">
               <div className="clicked-book-img">
                 <img src={clickedBook.cover} alt={clickedBook.title} />
               </div>

               <div className="clicked-book-info">
                 <h3>{clickedBook.title}</h3>
                 <div className="book-rating">
                   <span><FaStar /></span>
                    {clickedBook.ratings_average}
                 </div>
                 <button
                   onClick={handleMoreInfoClick}
                   className="more-info-btn">
                   More Info
                 </button>
               </div>
             </div>

             <button className="remove-button flex-center" onClick={handleRemoveFavourite}>
               <span>
                 <CiTrash size={24} />
               </span>
               Remove from favourites list
             </button>
           </div>
         </div>
       )}
     </section>
    </main>

    <footer>
     <Footer currentPage="favourites" />
    </footer>
   </>
  );
};

export default Favourite;