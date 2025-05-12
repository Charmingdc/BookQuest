import { useParams } from 'react-router-dom';

import useBookInfo from '@hooks/book/useBookInfo.tsx';

import ErrorBox from "@components/helper/ErrorBox.tsx";
import TopBar from '@components/helper/Navigation/TopBar.tsx';
import SideBar from '@components/helper/Navigation/SideBar.tsx';
import Loader from '@components/helper/Loader.tsx';
import BookPreview from '@components/helper/Book/BookPreview.tsx';
import Footer from '@components/helper/Navigation/Footer.tsx';


import './index.css';
const Preview = () => {
  const params = useParams();
  const identifier = params.identifier;
  if (!identifier) return;
  
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