import TopBar from '@components/helper/Navigation/TopBar';
import SideBar from '@components/helper/Navigation/SideBar';
import Footer from '@components/helper/Navigation/Footer';


import './index.css';
const Favourite = () => {
 return (
  <>
   <header>
    <TopBar pageTitle='Favourite Books' />
   </header>
   
   <main>
    <aside>
     <SideBar currentPage='favourites' />
    </aside>
      
    <section>
     <h1>  Favourite books </h1>
    </section>
   </main>

   <footer>
    <Footer currentPage="favourites" />
   </footer>
  </>
  );
}

export default Favourite;