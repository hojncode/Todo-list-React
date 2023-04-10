import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const pageName = ["signup", "signin", "todo"];
  const onClickGoto = (e) => {
    if (e === "signup") {
      navigate("signup");
    } else if (e === "signin") {
      navigate("signin");
    } else if (e === "todo") {
      navigate("todo");
    }
  };
  return (
    <>
      <header className="Header">
        <ul>
          {pageName.map((id, i) => (
            <li key={i}>
              <button onClick={() => onClickGoto(id)}>{pageName[i]}</button>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}

export default Header;
