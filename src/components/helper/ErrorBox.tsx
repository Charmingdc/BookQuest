import { useState, useEffect } from 'react'

type ErrorBoxProps = {
 type: string;
 message: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ type, message }) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
   if (type === 'no-data') {
     setImgSrc('no-data-pana');
   } else if (type === 'internal-error') {
     setImgSrc('internal-server-error');
   }
  }, [type]);

  return (
   <div className="error-box">
     <img src={`/illustrations/${imgSrc}.png`} alt={type} />
     <h4>{message}</h4>
   </div>
  );
};

export default ErrorBox;