const convertToStar = (rating: number | string) => {
  if (!rating) {
   console.error('No rating passed');
   return;
  }
  
  if (typeof rating === 'string') {
   return rating;
  } else {
    const ratingString = String(rating);
    const repeatNum = ratingString.split('.')[0];
  
    return '⭐'.repeat(repeatNum);
  }
};

export default convertToStar;