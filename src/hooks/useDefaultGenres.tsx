const useDefaultGenres = () => {
  const genres: string[] = [
   'All', 'Success', 'Action', 'Mystery', 'Sci-Fi', 'Romance', 'Productivity', 'Comedy', 'Horror',
  ]
  
  return { genres } 
}

export default useDefaultGenres;