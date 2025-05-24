export const Card = ({ id, url, handleClick }) => {
  return (
    <div onClick={handleClick}>
      <img width={64} src={url} />
    </div>
  );
};
