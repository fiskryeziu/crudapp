import { createContext, useReducer } from 'react'
import CrudReducer from './CrudReducer'

const CrudContext = createContext()

// const getFromLocalStorage = localStorage.getItem('todos')
//   ? JSON.parse(localStorage.getItem('todos'))
//   : []
// const array = [
//   { id: '1', todo: 'Eat' },
//   { id: '2', todo: 'Code' },
//   { id: '3', todo: 'Sleep' },
//   { id: '4', todo: 'Repeat' },
// ]

const initialState = {
  // todos: array.length > 0 ? array : getFromLocalStorage,
  todos: [
    { id: '1', todo: 'Eat' },
    { id: '2', todo: 'Code' },
    { id: '3', todo: 'Sleep' },
    { id: '4', todo: 'Repeat' },
  ],
}
export const CrudProvider = ({ children }) => {
  const addTodo = (item) => {
    dispatch({ type: 'todo/addTodo', payload: item })
  }

  const updateTodo = (updatedItem) => {
    dispatch({ type: 'todo/updateTodo', payload: updatedItem })
  }
  const deleteTodo = (deletedItem) => {
    dispatch({ type: 'todo/deleteTodo', payload: deletedItem })
  }

  const [state, dispatch] = useReducer(CrudReducer, initialState)

  // localStorage.setItem('todos', JSON.stringify(state.todos))

  return (
    <CrudContext.Provider
      value={{ todos: state.todos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudContext
