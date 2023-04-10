import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="Header">
        {/* <Link to={"/"}>Home</Link> */}
        <ul>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li>
            <Link to={"/signin"}>Signin</Link>
          </li>
          <li>
            <Link to={"/todo"}>Todo</Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
