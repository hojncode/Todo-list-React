import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const access_token = JSON.parse(localStorage.getItem("JWTtoken"));
  const checkToken = localStorage.getItem("JWTtoken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [todo, setTodo] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userId, setUserId] = useState(0);
  const [idt, setIdt] = useState(0);
  const [isChecked, setIsChecked] = useState([]);
  const [lastTodo, setLastTodo] = useState([]);
  const [delTodo, setDelTodo] = useState("");
  const [putTodo, setPutTodo] = useState({});
  const [boolean, setBoolean] = useState(true);
  const [inputTodo, setInputTodo] = useState("");
  const [editTodo, setEditTodo] = useState({});
  const [onEdit, setOnEdit] = useState(false);
  //   const [newEdit, setNewEdit] = useState(todo.todo || ""); //? 이 방법은 사용하지 말것.

  //로그인 유무 확인.
  useEffect(() => {
    if (localStorage.length === 0) {
      setLoading(true);
      setTimeout(() => {
        navigate("/signin");
        setLoading(false);
      }, 1000);
    }
  }, [navigate]);

  //GET:read
  useEffect(() => {
    if (checkToken !== null) {
      const getTodo = async () => {
        try {
          const response = await axios.get(`${API}/todos`, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
            },
          });
          setTodo(response.data);
          setUserId(response.data[0].userId);
          setIdt(response.data[response.data.length - 1].id);
        } catch (error) {
          console.error(error);
        }
      };
      getTodo();
    } else return;
  }, [idt, checkToken, setLastTodo]);

  //POST:create
  useEffect(() => {
    if (checkToken !== null) {
      const postTodo = async () => {
        try {
          const response = await axios.post(`${API}/todos`, lastTodo, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
              "Content-Type": "application/json",
            },
          });
          if (todo.length < 1) {
            setTodo([response.data]);
          } else return;
        } catch (error) {}
      };
      postTodo();
    } else return;
  }, [lastTodo]);

  //DELETE:delete
  useEffect(() => {
    if (checkToken !== null) {
      const deletePost = async () => {
        try {
          const response = await axios.delete(`${API}/todos/${delTodo.id}`, {
            headers: {
              Authorization: `Bearer ${access_token.access_token}`,
              // "Content-Type": "application/json",
            },
          });
        } catch (error) {}
      };
      deletePost();
    } else return;
  }, [delTodo]);

  //PUT:update
  useEffect(() => {
    if (checkToken !== null) {
      const updatePost = async () => {
        try {
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
        } catch (error) {}
      };
      updatePost();
    } else return;
  }, [putTodo.isCompleted, checkToken, editTodo.todo, putTodo.id, setTodo]);

  //todo 추가 하는 인풋
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputTodo(value);
  };

  //todo 추가 하기
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
    setIdt((prev) => prev + 1);
    setInputTodo("");
    setLastTodo(newTodo);
  };

  //todo 체크
  const handleChecked = (e) => {
    const checkedTodo = [...todo];
    checkedTodo[e].isCompleted = !checkedTodo[e].isCompleted;
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
  };

  //todo 체크 정보 서버로 보내기
  const handleSubmitChecked = (e) => {
    const editedTodo = e;
    setEditTodo(editedTodo); //선택된 투두만 들어감. onEditTodo
    const newTodo = {
      id: editedTodo.id,
      isCompleted: !isCompleted,
    };
    setPutTodo(newTodo);
  };

  //todo 삭제
  const handleDelete = (e) => {
    const deletedTodo = [...todo];
    // deletedTodo.splice(e, 1); //해당 TODO를 splice() 메서드를 사용하여 todos 배열에서 제거 (2번째 인자에 1을 추가하여 현재 index만 삭제-여기서는 e로 index를 가져옴) -> 배열 순서 오류로 사용안함
    const filteredTodos = deletedTodo.filter((td) => {
      if (td.id === e) {
        return false;
      }
      return true;
    });
    setTodo(filteredTodos);
    const newTodo = {
      id: e,
      todo,
      isCompleted,
      userId,
    };
    setDelTodo(newTodo);
  };

  //todo 수정창 열기
  const handleOpenEdit = (e) => {
    // e.preventDefault();
    if (!onEdit) {
      setOnEdit((prev) => !prev);
      const editedTodo = { ...e, nowEdit: true };
      setEditTodo(editedTodo); //선택된 투두만 들어감. onEditTodo
      setTodo((prev) => {
        return prev.map((item) => {
          if (item.id === editedTodo.id) {
            return { ...item, nowEdit: boolean };
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
    } else {
      alert("하나씩 수정해주세요.");
    }
  };

  //todo 수정창 닫기
  const handleCloseEdit = (e) => {
    // e.preventDefault();
    if (onEdit) {
      setOnEdit((prev) => !prev);
      const editedTodo = { ...e, nowEdit: true };
      setTodo((prev) => {
        return prev.map((item) => {
          if (item.id === editedTodo.id) {
            return { ...item, nowEdit: !boolean };
          }
          return item;
        });
      });
    } else {
      alert("하나씩 수정해주세요.");
    }
  };

  //todo 수정 인풋창
  const handleEditInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setEditTodo((prev) => ({
      ...prev,
      todo: value,
    }));
  };

  //todo 수정한것 서버롤 보내기
  const handleEditTextSubmit = (e) => {
    e.preventDefault();
    const checkedTodo = [...todo];
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
    const newTodo = {
      id: e.id,
      isCompleted,
    };
    setPutTodo(newTodo);
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
