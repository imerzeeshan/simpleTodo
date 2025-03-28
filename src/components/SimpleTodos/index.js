import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoTitle: '',
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  handleNewTodo = event => {
    this.setState({newTodoTitle: event.target.value})
  }

  handleAddNewTodo = () => {
    const {newTodoTitle, todosList} = this.state
    if (!newTodoTitle.trim()) return

    const id = todosList.length + 1

    const newtitle = newTodoTitle.trim().split(' ')
    const todoNo = parseInt(newtitle[newtitle.length - 1])

    const title = newtitle.slice(0, newtitle.length).join(' ')
    const newTodo = {
      id,
      title,
    }
    if (!Number.isNaN(todoNo)) {
      const newTodoList = []
      todosList.forEach((eachTodo, idx) => {
        if (idx === todoNo) {
          newTodoList.push(newTodo, eachTodo)
        } else {
          newTodoList.push(eachTodo)
        }
      })
      // console.log(newTodoList, newTodo)
      this.setState({
        todosList: newTodoList,
        newTodoTitle: '',
      })
    } else {
      this.setState({todosList: [...todosList, newTodo], newTodoTitle: ''})
    }
  }

  handleSaveEditedTodo = (id, title) => {
    const {todosList} = this.state
    const updatedTodosList = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          id,
          title,
        }
      }
      return eachTodo
    })
    this.setState({todosList: updatedTodosList})
  }

  render() {
    const {todosList, newTodoTitle} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div>
            <input
              className="input-box"
              type="text"
              value={newTodoTitle}
              placeholder="Add New Todo"
              onChange={this.handleNewTodo}
            />
            <button
              className="add-button"
              type="button"
              onClick={this.handleAddNewTodo}
            >
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                saveTodo={this.handleSaveEditedTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
