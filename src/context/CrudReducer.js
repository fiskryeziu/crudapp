const CrudReducer = (state, action) => {
  switch (action.type) {
    case 'todo/addTodo':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      }
    case 'todo/updateTodo':
      const updateTodo = action.payload
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === updateTodo.id) {
          return updateTodo
        } else {
          return todo
        }
      })
      return {
        todos: updatedTodos,
      }

    case 'todo/deleteTodo':
      const data = state.todos.filter((todo) => todo.id !== action.payload)
      return {
        todos: data,
      }

    default:
      return state
  }
}

export default CrudReducer
