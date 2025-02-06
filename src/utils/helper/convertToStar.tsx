const convertToStar = (rating: number) => {
  if (!rating) {
   console.error('No rating passed');
   return;
  }
  
  const ratingString = String(rating);
  const repeatNum = ratingString.split('.')[0];
  
  return '⭐'.repeat(repeatNum);
};

export default convertToStar;