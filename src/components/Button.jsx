const Button = ({ className, ...props }) => {
  return (
    <button
      className={`${className} text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/50 active:scale-95`}
      {...props}
    />
  );
};

export default Button;
