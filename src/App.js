import React, { Component } from "react";
import "./styles.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

let id = 0;

const Todo = (props) => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onClick={props.onToggle}
    />
    &nbsp;&nbsp;
    <span>{props.todo.text}</span>&nbsp;&nbsp;
    <button onClick={props.onDelete} className="delbtn">
      Delete
    </button>
  </li>
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [] || JSON.parse(localStorage.getItem("todos")),
      value: ""
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  addTodo() {
    this.setState({
      todos: [
        ...this.state.todos,
        { id: id++, text: this.state.value, checked: false }
      ]
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
  handleChange() {
    this.setState({
      todos: [
        ...this.state.todos,
        { id: id++, text: this.state.value, checked: false }
      ]
    });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleValue(event) {
    this.setState({ value: event.target.value });
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
            <input
              type="text"
              value={this.state.value}
              placeholder="todo"
              onChange={this.handleValue}
            />
            <button onClick={this.handleChange} className="addbtn">
              ADD Todo
            </button>
          </form>
          <ul>
            {this.state.todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={() => this.removeTodo(todo.id)}
                onToggle={() => this.toggleTodo(todo.id)}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
