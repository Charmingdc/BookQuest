import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';


const Home = () => {
  return (
    <>
     <header>
       <HomeTopBar />
     </header>
      
     <main>
       <RecommendationBox />
       <CategoriesBox />
     </main>
     
     <footer>
       <Footer currentPage='home' />
     </footer>
    </>
  )
}

export default Home;