import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, saveTodo} = props
  const {id, title} = todoDetails

  const [clickedId, setClickedId] = useState(null)
  const [editedTodo, setEditedTodo] = useState(title)
  const [isChecked, setIsChecked] = useState(false)

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const clickToSave = () => {
    saveTodo(id, editedTodo)
    setClickedId(null)
  }

  const checkbox = isChecked ? 'checked' : ''
  console.log(checkbox)

  return (
    <li className="todo-item">
      <input
        className="checkbox"
        type="checkbox"
        onClick={() => setIsChecked(!isChecked)}
      />
      {clickedId === id && (
        <>
          <input
            className="input-box"
            type="text"
            value={editedTodo}
            onChange={e => setEditedTodo(e.target.value)}
          />
          <button
            type="button"
            className="delete-btn edit-btn"
            onClick={clickToSave}
          >
            Save
          </button>
        </>
      )}

      {clickedId !== id && (
        <>
          <p className={`title ${checkbox}`}>{title}</p>
          <button
            type="button"
            className="delete-btn edit-btn"
            onClick={() => setClickedId(id)}
          >
            Edit
          </button>
        </>
      )}
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
