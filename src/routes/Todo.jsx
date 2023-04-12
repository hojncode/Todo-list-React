import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const initTodo = [
    { id: 0, todo: "todo1", isCompleted: false, isEdit: false, userId: 1 },
    { id: 1, todo: "todo2", isCompleted: true, isEdit: false, userId: 1 },
    { id: 2, todo: "todo3", isCompleted: false, isEdit: false, userId: 1 },
    { id: 3, todo: "todo4", isCompleted: false, isEdit: false, userId: 1 },
  ];

  const API = "https://www.pre-onboarding-selection-task.shop";
  const access_token = JSON.parse(localStorage.getItem("JWTtoken"));
  const checkToken = localStorage.getItem("JWTtoken");

  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState([]);
  const [userId, setUserId] = useState(0);
  const [idt, setIdt] = useState(0);
  const [lastTodo, setLastTodo] = useState("");

  const [inputTodo, setInputTodo] = useState("");
  const [editTodo, setEditTodo] = useState([]);
  const [editTodoInput, setEditTodoInput] = useState(editTodo.todo);
  const [onEdit, setOnEdit] = useState(false);
  //   const [newEdit, setNewEdit] = useState(todo.todo || ""); //? 이 방법은 사용하지 말것.
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(access_token.access_token);

    if (checkToken !== null) {
      const fetchTodo = async () => {
        try {
          const response = await axios.get(`${API}/todos`, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
              // "Content-Type": "application/json",
            },
          });
          console.log("response.status", response.status);
          console.log("response.data", response.data);
          setTodo(response.data);
          setUserId(response.data[0].userId);
          setIdt(response.data[response.data.length - 1].id);
          console.log("db에서 받은 투두", response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTodo();
    } else return;
  }, []);

  useEffect(() => {
    // console.log("POST투두\n", lastTodo);
    if (checkToken !== null) {
      const createTodo = async () => {
        try {
          const response = await axios.post(`${API}/todos`, lastTodo, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
              "Content-Type": "application/json",
            },
          });
          // alert("통과post");
          // console.log(response.data);
        } catch (error) {
          // alert("에러");
          // console.error("에러!!post", error.response.data);
        }
      };
      createTodo();
    } else return;
  }, [lastTodo]);

  useEffect(() => {
    if (checkToken !== null) {
      console.log("delete lastTodo.id", `${lastTodo.id}`);
      console.log("delete 토큰", `${access_token.access_token}`);
      const deletePost = async () => {
        try {
          const response = await axios.delete(`${API}/todos/${lastTodo.id}`, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
              // "Content-Type": "application/json",
            },
          });
          // alert("통과post");
          console.log("delete 통과!!", response.data);
        } catch (error) {
          // alert("에러");
          console.log("delete lastTodo.id", `${lastTodo.id}`);
          console.error("delete 에러!!", error.response.data);
        }
      };
      deletePost();
    } else return;
  }, [lastTodo]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputTodo(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputTodo) {
      return;
    }
    const newTodo = {
      id: idt + 1,
      todo: inputTodo,
      isCompleted,
      userId,
    };
    setTodo([...todo, newTodo]);
    setIdt((prev) => prev + 1);
    setInputTodo("");
    console.log("생성", todo);
    // console.log("생성typeof", JSON.stringify(todo));
    setLastTodo(newTodo);
    console.log("setLastTodo", newTodo);
  };

  const handleChecked = (e) => {
    const checkedTodo = [...todo];
    checkedTodo[e].isCompleted = !checkedTodo[e].isCompleted;
    setTodo(checkedTodo);
  };

  const handleDelete = (e) => {
    console.log("삭제버튼", e);
    const deletedTodo = [...todo];
    // deletedTodo.splice(e, 1); //해당 TODO를 splice() 메서드를 사용하여 todos 배열에서 제거 (2번째 인자에 1을 추가하여 현재 index만 삭제-여기서는 e로 index를 가져옴) -> 배열 순서 오류로 사용안함
    const filteredTodos = deletedTodo.filter((td) => {
      // console.log("삭제버튼내부", todo);
      if (td.id === e) {
        console.log("기역");
        return false;
        // return td.e !== e;
      }
      // console.log("니은");
      return true;
    });
    console.log("filteredTodos::", filteredTodos);
    setTodo(filteredTodos);
    const newTodo = {
      id: e,
      todo,
      isCompleted,
      userId,
    };
    setLastTodo(newTodo);
  };

  const handleEditInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log("value", value);
    setEditTodoInput(value);
    // setEditTodoInput("");
    // console.log("editTodoInput!", editTodoInput);
  };

  const handleOpenEdit = (e) => {
    // e.preventDefault();
    if (!onEdit) {
      setOnEdit((prev) => !prev);
      const editedTodo = [...todo];
      console.log(editedTodo);
      editedTodo[e].isEdit = !editedTodo[e].isEdit;
      // editedTodo[e].todo = todo[e].todo;
      console.log(editedTodo);
      // setTodo(editedTodo);
      setEditTodo(editedTodo);
      setEditTodoInput(editedTodo[e].todo);
    } else {
      alert("하나씩 수정해주세요.");
    }
  };

  const handleCloseEdit = (e) => {
    // e.preventDefault();
    const editedTodo = [...todo];
    console.log(editedTodo);
    editedTodo[e].isEdit = !editedTodo[e].isEdit;
    editedTodo[e].todo = todo[e]?.todo;
    console.log(editedTodo);
    setTodo(editedTodo);
    setEditTodo(editedTodo);
    setOnEdit((prev) => !prev);
  };

  const handleEditTextSubmit = (id) => {
    const newTodo = [...todo];
    newTodo[id].todo = editTodoInput;
    newTodo[id].isEdit = false;
    setTodo(newTodo);
    setEditTodoInput("");
    console.log(todo);
    setOnEdit((prev) => !prev);
  };

  useEffect(() => {
    if (checkToken === null) {
      setLoading(true);
      setTimeout(() => {
        navigate("/signin");
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <>
      <div>
        {loading ? (
          "로그인이 필요합니다.(로그인 페이지로 이동합니다)"
        ) : (
          <>
            <div className="todo-input">
              <span>Todo</span>
              <div>
                <form onSubmit={handleFormSubmit}>
                  <input
                    data-testid="new-todo-input"
                    type="text"
                    value={inputTodo}
                    onChange={handleInputChange}
                  />
                  <button data-testid="new-todo-add-button">TODO추가</button>
                </form>
              </div>
            </div>
            <ul className="todolist">
              {todo.map((td, index) => {
                return (
                  <li key={index}>
                    <label></label>
                    <input
                      type="checkbox"
                      checked={td.isCompleted}
                      onChange={() => handleChecked(index)}
                    />

                    {td.isEdit ? (
                      <>
                        <form>
                          <label></label>
                          <input
                            className="edit-input"
                            key={index}
                            data-testid="modify-input"
                            type="text"
                            value={editTodoInput}
                            onChange={handleEditInputChange}
                          />
                          <button
                            type="sumbit"
                            onClick={() => handleEditTextSubmit(index)}
                            data-testid="submit-button"
                          >
                            제출
                          </button>
                          <button
                            data-testid="cancel-button"
                            onClick={() => handleCloseEdit(td.id)}
                          >
                            취소
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <span>{td.todo} : </span>
                        <button
                          data-testid="modify-button"
                          onClick={() => handleOpenEdit(td.id)}
                        >
                          수정
                        </button>
                        <button
                          type="submit"
                          data-testid="delete-button"
                          onClick={() => handleDelete(td.id)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Todo;
