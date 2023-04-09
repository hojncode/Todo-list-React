import { useState } from "react";

function Todo() {
    const initTodo = [
      1,2
    ]

    const [todo,setTodo] = useState(initTodo)
    const [inputTodo, setInputTodo] = useState("")


    const handleInputChange = (e) => {
        e.preventDefault()
        const { value } = e.target;
        setInputTodo(value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setTodo([...todo, inputTodo])
        setInputTodo("")
    }
  return (
    <>
      <div>Todo</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input value={inputTodo} onChange={handleInputChange}/>
          <button>TODO추가</button>
        </form>
      </div>
          {todo.map((td,index) => (
            <li key={index}><label>
                <input type="checkbox" />
                  <span>{td}</span>
              </label>
              <button data-testid="modify-button">수정</button>
              <button data-testid="delete-button">삭제</button>
              </li>
          ))}
         
    </>
  );
}

export default Todo;
