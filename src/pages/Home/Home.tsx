import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';

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
    </>
  )
}

export default Home;