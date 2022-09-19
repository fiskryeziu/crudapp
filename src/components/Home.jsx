import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import CrudContext from '../context/CrudContext'
import { FaEdit, FaTimesCircle } from 'react-icons/fa'

const Home = () => {
  const [input, setInput] = useState('')
  const { todos, addTodo, deleteTodo } = useContext(CrudContext)
  const submitHandler = (e) => {
    e.preventDefault()
    const newTodo = {
      id: v4(),
      todo: input,
    }
    addTodo(newTodo)
    setInput('')
  }
  const deleteHandler = (id) => {
    if (window.confirm('Delete Item?')) {
      deleteTodo(id)
    }
  }
  return (
    <>
      <h2>CRUD | APP</h2>
      <div className="container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Todo.."
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.todo}
                <div>
                  <Link to={`/edit/${todo.id}`}>
                    <FaEdit color="#FFEEAF" />
                  </Link>
                  <FaTimesCircle
                    onClick={() => deleteHandler(todo.id)}
                    color="#EB1D36"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h3>No Data!</h3>
        )}
      </div>
    </>
  )
}

export default Home
