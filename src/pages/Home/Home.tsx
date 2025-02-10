import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';
import BookPreview from '@components/helper/BookPreview.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';


const Home = () => {
  return (
    <>
     <header>
       <HomeTopBar />
     </header>
      
     <main className='home-main'>
       <aside arial-label='Sidebar'>
       </aside>
       
       <section className='mobile-home'>
         <RecommendationBox />
         <CategoriesBox />
       </section>
       
       <aside arial-label='Book-preview'>
       </aside>
     </main>
     
     <footer>
       <Footer currentPage='home' />
     </footer>
    </>
  )
}

export default Home;