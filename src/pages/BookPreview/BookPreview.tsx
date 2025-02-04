import { useParams } from 'react-router-dom'

const BookPreview = () => {
  const params = useParams();
  
  return (
   <>
    <main>
     <h1> Book Preview </h1>
     
     <h3>
       identifier { params.identifier } 
     </h3>
    </main>
   </>
  )
}


export default BookPreview;