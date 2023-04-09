import { useState } from "react";

function Todo() {
  const initTodo = [
    { id: 0, todo: "todo1", isCompleted: false, isEdit: false },
    { id: 1, todo: "todo2", isCompleted: true, isEdit: false },
  ];

  const [todo, setTodo] = useState(initTodo);
  const [inputTodo, setInputTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  //   const [newEdit, setNewEdit] = useState(todo.todo || ""); //! 이 방법은 사용하지 말것.

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputTodo(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTodo([
      ...todo,
      {
        id: todo.length,
        todo: inputTodo,
        isCompleted: false,
        isEdit: false,
        userId: 0,
      },
    ]);
    setInputTodo("");
    console.log("생성", todo);
  };

  const handleChecked = (e) => {
    const checkedTodo = [...todo];
    checkedTodo[e].isCompleted = !checkedTodo[e].isCompleted;
    setTodo(checkedTodo);
  };

  const handleDelete = (e) => {
    const deletedTodo = [...todo];
    deletedTodo.splice(e, 1); //해당 TODO를 splice() 메서드를 사용하여 todos 배열에서 제거 (2번째 인자에 1을 추가하여 현재 index만 삭제-여기서는 e로 index를 가져옴)
    setTodo(deletedTodo);
  };

  const handleOpenEdit = (e) => {
    const editedTodo = [...todo];
    editedTodo[e].isEdit = !editedTodo[e].isEdit;
    setTodo(editedTodo);
    setEditTodo(editedTodo[e].todo);
  };

  const handleEditInputChange = (e) => {
    const { value } = e.target;
    console.log("value", value);
    setEditTodo(value);
  };

  const handleEditTextSubmit = (id) => {
    const newTodo = [...todo];
    newTodo[id].todo = editTodo;
    newTodo[id].isEdit = false;
    setTodo(newTodo);
    setEditTodo("");
  };

  return (
    <>
      <div>Todo</div>
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
      {todo.map((td) => {
        return (
          <li key={td.id}>
            <label>
              <input
                type="checkbox"
                checked={td.isCompleted}
                onChange={() => handleChecked(td.id)}
              />
            </label>
            {td.isEdit ? (
              <>
                <input
                  data-testid="modify-input"
                  type="text"
                  value={editTodo}
                  onChange={handleEditInputChange}
                />
                <button
                  onClick={() => handleEditTextSubmit(td.id)}
                  data-testid="submit-button"
                >
                  제출
                </button>

                <button
                  data-testid="cancel-button"
                  onClick={() => handleOpenEdit(td.id)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <span>{td.todo}</span>
                <button
                  data-testid="modify-button"
                  onClick={() => handleOpenEdit(td.id)}
                >
                  수정
                </button>
              </>
            )}
            <button
              data-testid="delete-button"
              onClick={() => handleDelete(td.id)}
            >
              삭제
            </button>
          </li>
        );
      })}
    </>
  );
}

export default Todo;
