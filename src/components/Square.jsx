export const Square = ({ children, isSelected, actualizarTablero, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
    const handleClick = () => {
      actualizarTablero(index);
    };
  
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };
  