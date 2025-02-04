type TabProps = {
 genre: string;
 onClick: () => void;
 isActive: boolean;
}

const Tab = ({ genre, onClick, isActive }: TabProps) => {
  return (
    <button 
      className={isActive ? 'active' : ''}
      onClick={onClick}>
       { genre }
     </button>
 )
}

export default Tab;