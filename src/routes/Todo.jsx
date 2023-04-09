import { useState } from "react";

function Todo() {
  const initTodo = [
    { text: 100, completed: false },
    { text: 200, completed: true },
  ];

  const [todo, setTodo] = useState(initTodo);
  const [inputTodo, setInputTodo] = useState("");

  const handleInputChange = (e) => {
    // e.preventDefault()
    const { value } = e.target;
    setInputTodo(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTodo([...todo, { text: inputTodo, completed: false }]);
    setInputTodo("");
  };

  const handleChecked = (e) => {
    const checkedTodo = [...todo];
    checkedTodo[e].completed = !checkedTodo[e].completed;
    setTodo(checkedTodo);
    console.log(todo[e].completed);
  };

  const handleDelete = (e) => {
    const deletedTodo = [...todo];
    deletedTodo.splice(e, 1); //해당 TODO를 splice() 메서드를 사용하여 todos 배열에서 제거 (2번째 인자에 1을 추가하여 현재 index만 삭제-여기서는 e로 index를 가져옴)
    setTodo(deletedTodo);
    console.log(todo)
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
      {todo.map((td, _i) => (
        <li key={_i}>
          <label>
            <input
              type="checkbox"
              checked={td.completed}
              onChange={() => handleChecked(_i)}
            />
            <span>{td.text}</span>
          </label>
          <button data-testid="modify-button">
            수정
          </button>
          <button data-testid="delete-button" onClick={() => handleDelete(_i)}>삭제</button>
        </li>
      ))}
    </>
  );
}

export default Todo;
