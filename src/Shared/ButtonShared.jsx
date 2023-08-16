import { Link } from "react-router-dom";

const ButtonShared = ({ children }) => {
  return (
    <div>
      <Link className=" btn btn-outline  btn-warning outline">
        {children}
      </Link>
    </div>
  );
};

export default ButtonShared;
