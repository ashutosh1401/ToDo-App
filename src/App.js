import React, { Component } from "react";
import "./styles.css";
import NavBar from "./NavBar";

let id = 0;

const Todo = (props) => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onClick={props.onToggle}
    />
    <span>{props.todo.text}</span>
    <button onClick={props.onDelete}>delete</button>
  </li>
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [] || JSON.parse(localStorage.getItem("todos"))
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addTodo() {
    const text = prompt("Add todo ");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
  handleSubmit(event) {
    event.preventDefaut();
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <h1>Hello User</h1>
        <p>This is To-Do Application made using React JS</p>
        <br />
        <div>Total Todos are : {this.state.todos.length}</div>
        <div>
          Total Unchecked Todos :{" "}
          {this.state.todos.filter((todo) => !todo.checked).length}
        </div>
        <div className="bod">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="todo" placeholder="todo" />
            <button onClick={this.addTodo}>ADD Todo</button>
          </form>
          <ul>
            {this.state.todos.map((todo) => (
              <Todo
                todo={todo}
                onDelete={() => this.removeTodo(todo.id)}
                onToggle={() => this.toggleTodo(todo.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
