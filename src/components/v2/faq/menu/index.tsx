interface FaqMenuProps {
  value: string; // prop kiểu string để truyền value vào
  className: string; // prop kiểu string để truyền value vào
}

const FaqMenu: React.FC<FaqMenuProps> = ({ value, className }) => {
  return (
    <div className={className}>
      <p>{value}</p>
    </div>
  );
};

export default FaqMenu;
