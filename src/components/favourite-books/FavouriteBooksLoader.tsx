const FavouriteBooksLoader = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
       <div className="favourite-books-loader" key={i}>
         <div className="book-image"></div>
         <p></p>
       </div>
      ))}
    </>
  );
};
export default FavouriteBooksLoader;