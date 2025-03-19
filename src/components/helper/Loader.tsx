const Loader = () => {
  const sclr: string = 'rgb(64, 90, 255)';
  const shade: string = 'rgba(180, 180, 180)';
  
  return (
    <div className="loader">
      <div className="book-wrapper">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 126 75"
         className="book"
        >
        <rect
          strokeWidth="5"
          stroke={sclr}
          rx="7.5"
          height="70"
          width="121"
          y="2.5"
          x="2.5"></rect>
         <line
          strokeWidth="5"
          stroke={sclr}
          y2="75"
          x2="63.5"
          x1="63.5"></line>
         <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke={shade}
          d="M25 20H50"></path>
         <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke={shade}
          d="M101 20H76"></path>
        <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke={shade}
          d="M16 30L50 30"></path>
        <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke={shade}
          d="M110 30L76 30"></path>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 65 75"
        className="book-page">
       <path
          strokeWidth="4"
          stroke={shade}
          d="M40 20H15"></path>
        <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke={shade}
          d="M49 30L15 30"></path>
        <path
          strokeWidth="5"
          stroke={sclr}
          d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"></path>
      </svg>
    </div>
    
    <h2> Loading... </h2>
  </div>
  )
}

export default Loader;