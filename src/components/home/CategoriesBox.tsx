import Tab from './Tab.tsx';

const CategoriesBox = () => {
  const demoGenres: string[] = [
   'All', 'Mystery', 'Finance', 'Fanstasy', 'Romance'
   ]
  
  
  return (
   <section className='categories-section'>
    <h2> Categories </h2>
    
    
    <div className='tabs'>
     { 
      demoGenres.map((name, index) => (
         <Tab genre={name} key={index} />
       ))
     }
    </div>
   </section>
  )
}

export default CategoriesBox;