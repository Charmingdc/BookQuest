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
     {[...Array(10)].map((_, i) => (
       <div className='book' key={i}>
       
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