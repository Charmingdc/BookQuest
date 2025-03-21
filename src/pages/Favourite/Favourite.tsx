import { useState } from 'react';
import TopBar from '@components/helper/Navigation/TopBar';
import SideBar from '@components/helper/Navigation/SideBar';
import Footer from '@components/helper/Navigation/Footer';


/*
type FavouriteBooksProps = {
 title: string;
 key: string;
 cover: string;
 ratings_average: string;
}
*/

import './index.css';
const Favourite = () => {
 const [clickedBook, setClickedBook] = useState<number|null>(null);
 const [openModal, setOpenModal] = useState<boolean>(false);
 
 const handleBookClick = (bookIndex: number) => {
  setClickedBook(bookIndex);
  setOpenModal(true);
  console.log('Clicked book index is:', bookIndex);
 }
 
 
 return (
  <>
   <header>
    <TopBar pageTitle='Favourite Books' />
   </header>
   
   <main>
    <aside>
     <SideBar currentPage='favourites' />
    </aside>
      
    <section className='favourite-books-container'>
     {[...Array(28)].map((_, i) => (
       <div 
        className='favourite-books'
        key={i}
        onClick={() => handleBookClick(i)}>
        <div></div>
        
        <p> The Millionaire Fastlane </p>
       </div>
      ))}
      
      
      { openModal && 
      <div className='clicked-book-modal-wrapper' onClick={() => setOpenModal(false)}>
       <div className='clicked-book-modal'>
        <div>
         <div className='clicked-book-img'>
         </div>
         
         <div className='clicked-book-info'>
          <h3>
           The Millionaire Fastlane 
          </h3>
          <p> 4.3 </p>
          <button> More Info </button>
         </div>
        </div>
        
        <button className'flex-center'> 
         Remove
        </button>
       </div>
      </div> }
    </section>
   </main>

   <footer>
    <Footer currentPage='favourites' />
   </footer>
  </>
  );
}

export default Favourite;