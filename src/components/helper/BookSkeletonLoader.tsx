const BookSkeletonLoader = () => {
  return (
   <div className="bookSkeletonWrapper flex-col-center">
     <div className='bookSkeleton flex-start'>
       <div className='bookSkeletonImgWrapper'></div>
            
       <div className="bookSkeletonInfo">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
       </div>
     </div>
   </div>
  )
}


export default BookSkeletonLoader;