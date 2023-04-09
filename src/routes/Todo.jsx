import { useState } from "react";

function Todo() {
  const initTodo = [
    { text: 1, completed: false },
    { text: 2, completed: true },
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

  return (
    <>
      <div>Todo</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input data-testid="new-todo-input"  type="text" value={inputTodo} onChange={handleInputChange} />
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
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </li>
      ))}
    </>
  );
}

export default Todo;
