const getCoverUrl = (coverId?: number, isbn?: string, size: 'S' | 'M' | 'L' = 'M') => {
    if (coverId) return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
    if (isbn) return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
  
    return '/placeholder.jpg';
};
  
export default getCoverUrl;