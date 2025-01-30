import { useState } from 'react'

import useDefaultGenres from '@hooks/useDefaultGenres.tsx';
import Tab from './Tab.tsx';

type SelectedGenre = {
  name: string;
  index: number;
}


const CategoriesBox = () => {
  const { genres } = useDefaultGenres();
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({name: 'All', index: 0});
 
  
  return (
   <section className='categories-section'>
    <h2> Categories </h2>
    
    
    <div className='tabs flex-between'>
     {genres.map((genre, index) => (
       <Tab 
         genre={genre} 
         key={genre}
         onClick={() => setSelectedGenre({name: genre, index: index})} 
         isActive={selectedGenre.index == index} />
      ))}
    </div>
   </section>
  )
}

export default CategoriesBox;