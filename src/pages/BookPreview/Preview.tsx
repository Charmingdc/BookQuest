import { useParams } from 'react-router-dom';

import useBookInfo from '@hooks/book/useBookInfo';

import ErrorBox from "@components/helper/ErrorBox";
import TopBar from '@components/helper/Navigation/TopBar';
import SideBar from '@components/helper/Navigation/SideBar';
import Loader from '@components/helper/Loader';
import BookPreview from '@components/helper/Book/BookPreview';
import Footer from '@components/helper/Navigation/Footer';


import './index.css';
const Preview = () => {
  const params = useParams();
  const identifier = params.identifier;
  const { bookInfo, loading, error } = useBookInfo(identifier);


  return (
    <>
     <header>
      <TopBar pageTitle={(bookInfo) ? bookInfo.title : 'No Book Found'} />
     </header>

     <main>
      <aside>
       <SideBar currentPage='home' />
      </aside>
      
      <section className='book-overview'>
       {loading && <Loader />}

       {error && (
         <ErrorBox 
          type='internal-error'
          message='Error getting book' />
       )}

       {bookInfo && (
        <BookPreview bookInfo={bookInfo} />
       )}
      </section>
    </main>

    <footer>
      <Footer currentPage="home" />
    </footer>
   </>
  );
};

export default Preview;