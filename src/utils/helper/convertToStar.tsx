const convertToStar = (rating: number | null) => {
  if (!rating) {
   console.error('No rating passed');
   return;
  }
  
  if (rating === 'N/A') return rating;
  
  const ratingString = String(rating);
  const repeatNum = ratingString.split('.')[0];
  return '⭐'.repeat(repeatNum);
};

export default convertToStar;