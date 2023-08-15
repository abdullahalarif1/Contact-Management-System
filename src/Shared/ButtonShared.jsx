const ButtonShared = ({ children }) => {
  return (
    <div>
      <a className="btn btn-outline  btn-warning outline">
        {children}
      </a>
    </div>
  );
};

export default ButtonShared;
