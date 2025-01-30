import Tab from './Tab.tsx';

const CategoriesBox = () => {
  const defaultGenres: string[] = [
   'All', 'Success', 'Action', 'Mystery', 'Sci-Fi', 'Romance', 'Productivity', 'Comedy', 'Horror',
  ]
  
  return (
   <section className='categories-section'>
    <h2> Categories </h2>
    
    
    <div className='tabs flex-between'>
     {defaultGenres.map((genre, index) => (
       <Tab genre={genre} key={index} />
      ))}
    </div>
   </section>
  )
}

export default CategoriesBox;