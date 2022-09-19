import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CrudContext from '../context/CrudContext'

const Edit = () => {
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    todo: '',
  })
  const { todos, updateTodo } = useContext(CrudContext)
  const navigate = useNavigate()
  const params = useParams()
  const todoId = params.id

  useEffect(() => {
    const selectedItemData = todos.find((x) => x.id === todoId)
    setSelectedItem(selectedItemData)
  }, [todoId, todos])

  const submitHandler = (e) => {
    e.preventDefault()
    updateTodo(selectedItem)
    navigate('/')
  }
  const onChange = (e) => {
    setSelectedItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <h2>CRUD | APP</h2>
      <div className="container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="todo"
            placeholder="Todo.."
            value={selectedItem.todo}
            required
            onChange={onChange}
          />
          <button>Edit</button>
        </form>
      </div>
    </>
  )
}

export default Edit
