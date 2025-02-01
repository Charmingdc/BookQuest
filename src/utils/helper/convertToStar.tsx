const convertToStar = (rating: number) => {
  const ratingString = String(rating);
  const repeatNum = ratingString.split('.')[0];
  
  return '⭐'.repeat(repeatNum);
};

export default convertToStar;