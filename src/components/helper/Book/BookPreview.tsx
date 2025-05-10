import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { IoBookOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { LuHeart } from 'react-icons/lu';

import { BookInfoProp } from '@tp/book/types.tsx';
import useFavouriteBooks from "@hooks/book/useFavouriteBooks.tsx";
import convertToStar from '@utils/helper/convertToStar.tsx';

import '@pages/BookPreview/index.css';

const BookPreview = ({ bookInfo }: BookInfoProp) => {
  const [openFullDesc, setOpenFullDesc] = useState<boolean>(false);
  const location = useLocation();
  const { addToFavourite, updatingFavBooks } = useFavouriteBooks();


  const handleAddToFavourites = async () => {
    const { title, isbn, cover, ratings_average } = bookInfo;
   
    const response = await addToFavourite({
      title, isbn, cover, ratings_average
     });

    try {
      if (response.type === 'error') throw new Error(response.message);
      
      toast.success(response.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className='book-info-section flex-col-center'>
      <div className={`${location.pathname === '/home' ? 'book-main-info-home' : 'book-main-info'}`}>
        <div className='book-info-img-wrapper flex-center'>
          <img src={bookInfo.cover} alt={bookInfo.title} />
        </div>

        <div className='book-meta-data'>
          <div className='action-tab'>
            <a href={`${bookInfo.url}`} className='flex-center'>
              Read Book 
              <span>
                <IoBookOutline />
              </span>
            </a>

            <button 
              className='flex-center'
              onClick={handleAddToFavourites}>
              { updatingFavBooks ? 'Adding...' : (
               <>
                Add to Favourite
                <span>
                  <LuHeart />
                </span>
               </>)}
            </button>
          </div>

          <h2 className='book-name'>
            { bookInfo.title }
          </h2>

          <p className='star-rating'>
            { convertToStar(bookInfo.ratings_average) }
            <span>
              { bookInfo.ratings_average }
            </span>
          </p>

          <p className='author-name'> 
            { bookInfo.author_name }
          </p>
        </div>
      </div>

      <div className='quick-info flex-center'>
        <div>
          <strong> Published </strong>
          <p>
            { bookInfo.publish_date }
          </p>
        </div>

        <div>
          <strong> Pages </strong>
          <p>
            { bookInfo.number_of_pages }
          </p>
        </div>

        <div>
          <strong> Editions </strong>
          <p>
            { bookInfo.editions_count }
          </p>
        </div>
      </div>

      <div className='book-about flex-col-center'>
        <h3> Description </h3>
        <p className={`${openFullDesc ? 'show-full-desc' : ''}`}> 
          { bookInfo.description }
        </p>
      </div>

      <button className='toggle-desc flex-center' onClick={() => setOpenFullDesc(!openFullDesc)}>
        {openFullDesc ? 'Read less' : 'Read more'}
        <span>
          {openFullDesc ? (<IoEyeOffOutline size={20} />) : (<IoEyeOutline size={20} />)}
        </span>
      </button>
    </section>
  );
}

export default BookPreview;