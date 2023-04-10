import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const pageName = [
    { id: 1, page: "signup" },
    { id: 2, page: "signin" },
    { id: 3, page: "todo" },
  ];
  const onClickGoto = (e) => {
    if (e.page === "signup") {
      navigate("/signup");
    } else if (e.page === "signin") {
      navigate("/signin");
    } else if (e.page === "todo") {
      navigate("/todo");
    }
  };
  return (
    <>
      <header className="Header">
        <ul>
          {pageName.map((i, _i) => (
            <li key={i.id}>
              <button onClick={() => onClickGoto(i)}>
                {pageName[_i].page}
              </button>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}

export default Header;
