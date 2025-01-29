import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';

import './index.css';


const Home = () => {
  return (
    <>
     <header>
       <HomeTopBar />
     </header>
      
     <main>
       <RecommendationBox />
     </main>
    </>
  )
}

export default Home;