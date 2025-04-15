import { useState, useRef } from 'react';
import './App.css'
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const inputRef = useRef();

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodos(json))
  })
  const addTodo = ()=>{
    const inputValue = inputRef.current.value;
    setTodos([...todos,{id:Date.now(),title:inputValue}]);
    inputRef.current.value = '';
  }
  const deleteTodo = (id)=>{
    setTodos(todos.filter((todo)=> todo.id != id))
  }
  return (
    <>
      <div>
        <input
          ref={inputRef}
        type="text" />
        <button onClick={addTodo}>Add</button>
        <br />
        <ul>
          {todos.map((todo,index)=>(
            <li key={todo.id}>{todo.title}
            <button onClick={()=>deleteTodo(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
