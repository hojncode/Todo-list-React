import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const initTodo = [
    { id: 0, todo: "todo1", isCompleted: false, userId: 0 },
    // { todo: "todo2", isCompleted: true },
    // { todo: "todo3", isCompleted: false },
    // { todo: "todo4", isCompleted: false },
  ];

  const API = "https://www.pre-onboarding-selection-task.shop";
  const access_token = JSON.parse(localStorage.getItem("JWTtoken"));
  const checkToken = localStorage.getItem("JWTtoken");
  const inputRef = useRef("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState([]);
  const [userId, setUserId] = useState(0);
  const [idt, setIdt] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const [lastTodo, setLastTodo] = useState([]);
  const [delTodo, setDelTodo] = useState("");
  const [putTodo, setPutTodo] = useState({});

  const [test, setTest] = useState(false);

  const [inputTodo, setInputTodo] = useState("");
  const [editTodo, setEditTodo] = useState({});
  // const [editTodoInput, setEditTodoInput] = useState(editTodo.todo);
  const [onEdit, setOnEdit] = useState(false);
  //   const [newEdit, setNewEdit] = useState(todo.todo || ""); //? 이 방법은 사용하지 말것.
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.length === 0) {
      setLoading(true);
      setTimeout(() => {
        navigate("/signin");
        setLoading(false);
      }, 1000);
    }
  }, [navigate]);

  useEffect(() => {
    // console.log(access_token.access_token);

    if (checkToken !== null) {
      const fetchTodo = async () => {
        try {
          const response = await axios.get(`${API}/todos`, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
            },
          });
          // console.log("response.status", response.status);
          console.log("response", response.data);
          setTodo(response.data);
          setUserId(response.data[0].userId);
          setIdt(response.data[response.data.length - 1].id);
          // setIsDone(response.data.isCompleted)
          // console.log("db에서 받은 투두", response.data);
          // if (response.data[0].userId === 0) {
          //   return setTodo(lastTodo);
          // }
          // return;
        } catch (error) {
          console.error(error);
        }
      };
      fetchTodo();
    } else return;
  }, [idt, checkToken, setLastTodo]);

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
          console.log(todo.length);
          if (todo.length < 1) {
            setTodo([response.data]);
          } else return;
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
      // console.log("delete delTodo.id", `${delTodo.id}`);
      // console.log("delete 토큰", `${access_token.access_token}`);
      const deletePost = async () => {
        try {
          const response = await axios.delete(`${API}/todos/${delTodo.id}`, {
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
  }, [delTodo]);

  useEffect(() => {
    if (checkToken !== null) {
      const updatePost = async () => {
        // console.log("내가찾는곳", editTodo.todo);
        try {
          console.log("putTodo.id", putTodo.id);
          console.log("내가찾는곳1-editTodo.todo", editTodo.todo);
          console.log("내가찾는곳2-putTodo.isCompleted", putTodo.isCompleted);
          const response = await axios.put(
            `${API}/todos/${putTodo.id}`,
            {
              todo: editTodo.todo,
              isCompleted: putTodo.isCompleted,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
          // alert("통과post");
          console.log("updatePost 통과!!", response.data);
          // setTodo((prev) => {
          //   return prev.map((item) => {
          //     if (item.id === response.data.id) {
          //       return { ...item, item: response.data };
          //     }
          //     return item;
          //   });
          // });
          // alert("updatePost 통과todo!!", todo);
        } catch (error) {
          console.error("Put에러", error.response.data);
        }
      };
      updatePost();
    } else return;
  }, [putTodo.isCompleted, checkToken, editTodo.todo, putTodo.id, setTodo]);

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
    // setTodo([...todo, newTodo]);
    setIdt((prev) => prev + 1);
    setInputTodo("");
    // console.log("생성", todo);
    // console.log("생성typeof", JSON.stringify(todo));
    setLastTodo(newTodo);
    console.log("setLastTodo", newTodo);
  };

  const handleChecked = (e) => {
    const checkedTodo = [...todo];
    checkedTodo[e].isCompleted = !checkedTodo[e].isCompleted;
    console.log("checkedTodo", checkedTodo);
    setIsChecked(checkedTodo[e]);
    const arraydump = [...todo];
    const doneChecked = () =>
      arraydump.map((item) => {
        if (item.id === checkedTodo.id) {
          return { ...item, isCompleted: !isCompleted };
        }
        return item;
      });
    setTodo(doneChecked());
    console.log("isChecked", isChecked);
    console.log("setTodo-체크버튼 클릭시", todo);
  };

  const handleSubmitChecked = (e) => {
    // setTodo(isChecked);
    console.log("handleSubmitChecked버튼", todo);
    console.log("isChecked", isChecked);
    // setEditTodo((prev) => prev);
    const editedTodo = e;
    console.log("editedTodo", editedTodo);
    setEditTodo(editedTodo); //선택된 투두만 들어감. onEditTodo
    const newTodo = {
      id: editedTodo.id,
      isCompleted: !isCompleted,
    };
    setPutTodo(newTodo);
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
    setDelTodo(newTodo);
  };

  const handleOpenEdit = (e) => {
    // e.preventDefault();
    if (!onEdit) {
      setOnEdit((prev) => !prev);
      console.log("e", e);
      const editedTodo = { ...e, nowEdit: true };
      console.log("editedTodo", editedTodo);
      // setOpenEditWindow((prev) => !prev); //  수정 인풋창만 여는 단순 스테이트
      setEditTodo(editedTodo); //선택된 투두만 들어감. onEditTodo
      setTodo((prev) => {
        return prev.map((item) => {
          if (item.id === editedTodo.id) {
            return { ...item, nowEdit: !test };
          }
          return item;
        });
      });
      const newTodo = {
        id: e.id,
        todo,
        isCompleted,
        userId,
      };
      setPutTodo(newTodo);
      console.log("todo", todo);
    } else {
      alert("하나씩 수정해주세요.");
    }
  };

  const handleCloseEdit = (e) => {
    // e.preventDefault();
    if (onEdit) {
      setOnEdit((prev) => !prev);
      console.log("취소버튼클릭");
      const editedTodo = { ...e, nowEdit: true };
      console.log("editedTodo", editedTodo);
      // setOpenEditWindow((prev) => !prev); //  수정 인풋창만 여는 단순 스테이트
      // setEditTodo(editedTodo); //선택된 투두만 들어감. onEditTodo
      setTodo((prev) => {
        return prev.map((item) => {
          if (item.id === editedTodo.id) {
            return { ...item, nowEdit: false };
          }
          return item;
        });
      });
    } else {
      alert("하나씩 수정해주세요.");
    }
  };

  const handleEditInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log("value", value);
    console.log("editTodo-input", editTodo);
    setEditTodo((prev) => ({
      ...prev,
      todo: value,
    }));
    // setEditTodoInput("");
    console.log("setEditTodo!", editTodo);
  };

  const handleEditTextSubmit = (e) => {
    e.preventDefault();
    // alert("왜 알럿이 안되", e);
    const checkedTodo = [...todo];
    console.log("checkedTodo", checkedTodo);
    setIsChecked(checkedTodo[e.id]);
    const arraydump2 = [...todo];
    const changeTodoText = () => {
      return arraydump2.map((item) => {
        if (item.id === editTodo.id) {
          return { ...item, todo: editTodo.todo, nowEdit: false };
        }
        return item;
      });
    };
    setOnEdit((prev) => !prev);
    setTodo(changeTodoText());
    // alert("isChecked", isChecked);
    // setEditTodo({});
    const newTodo = {
      id: e.id,
      isCompleted,
    };
    setPutTodo(newTodo);
    console.log("newTodos", todo);
  };

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
                    <form onSubmit={() => handleSubmitChecked(td)}>
                      <label></label>
                      <input
                        type="checkbox"
                        checked={td.isCompleted}
                        onChange={() => {
                          handleChecked(index);
                          handleSubmitChecked(td);
                        }}
                      />
                    </form>
                    {td.nowEdit ? (
                      <>
                        <form>
                          <label></label>
                          <input
                            className="edit-input"
                            key={index}
                            data-testid="modify-input"
                            type="text"
                            ref={inputRef}
                            value={editTodo.todo}
                            onChange={handleEditInputChange}
                          />
                          <button
                            type="sumbit"
                            onClick={(e) => handleEditTextSubmit(e)}
                            data-testid="submit-button"
                          >
                            제출
                          </button>
                        </form>
                        <button
                          data-testid="cancel-button"
                          onClick={() => handleCloseEdit(td)}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{td.todo} : </span>
                        <button
                          data-testid="modify-button"
                          onClick={() => handleOpenEdit(td)}
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
