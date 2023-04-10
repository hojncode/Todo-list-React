import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="Header">
        {/* <Link to={"/"}>Home</Link> */}
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/signin"}>Signin</Link>
        <Link to={"/todo"}>Todo</Link>
      </div>
    </>
  );
}

export default Header;
