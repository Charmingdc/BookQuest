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
      
    <section className='favourite-books-container'>
     {[...Array(28)].map((_, i) => (
       <div className='favourite-books' key={i}>
        <div></div>
        
        <p> The Millionaire Fastlane </p>
       </div>
      ))}
    </section>
   </main>

   <footer>
    <Footer currentPage='favourites' />
   </footer>
  </>
  );
}

export default Favourite;