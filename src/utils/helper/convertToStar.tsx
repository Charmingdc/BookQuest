const convertToStar = (rating: string | null) => {
  if (!rating) {
    console.error('No rating passed');
    return;
  }

  if (rating === 'N/A') return rating;

  const ratingString = String(rating);
  const repeatNum = ratingString.split('.')[0];
  return '⭐'.repeat(Number(repeatNum));
};

export default convertToStar;