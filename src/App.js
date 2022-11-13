import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        "Empty tasks are not allowed",
        "Check out this awesome strikethrough",
        "Duplicate tasks? Never heard of it!",
        "Bulls' green style... classics✨",
        "Remove buttons work just fine"
      ]
    };
  }

  handleAdd(newTask) {
    this.setState({ tasks: this.state.tasks.concat([newTask]) });
  }

  handleRemove(task) {
    var index = this.state.tasks.indexOf(task);

    const array = [...this.state.tasks];
    array.splice(index, 1);
    this.setState({ tasks: array });
  }

  render() {
    return (
      <div className="container">
        <h1>TODO List</h1>
        <TaskAdder
          onAdd={this.handleAdd.bind(this)}
          addedTasks={this.state.tasks}
        />

        <h2 className="subheading">Here is what you need to do:</h2>
        <TaskList
          tasks={this.state.tasks}
          onRemove={this.handleRemove.bind(this)}
        />
        <h2 className="subheading">
          Timur Kalandarov, U62979292
          <br />
          <br />
          tkalandarov@usf.edu
        </h2>
      </div>
    );
  }
}

/**
 * Represents a single task in the list.
 *
 * Props:
 *  - text: A string representing the contents of the task.
 */
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false, className: "taskText" };
  }

  handleCheck(event) {
    var checked = event.target.checked;
    var className = checked ? "taskText completed" : "taskText";

    this.setState({ completed: checked, className: className });
  }

  handleRemove() {
    this.props.onRemove(this.props.text);
  }

  render() {
    return (
      <li>
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={this.state.completed}
            onChange={this.handleCheck.bind(this)}
          />
          <span className="checkmark" />
        </label>
        <span className={this.state.className}>{this.props.text}</span>
        <button onClick={this.handleRemove.bind(this)}>x</button>
      </li>
    );
  }
}

/**
 * Represents a list of tasks.
 *
 * Props:
 *  - tasks: An array of strings, each representing a task.
 */
class TaskList extends React.Component {
  handleRemove(task) {
    this.props.onRemove(task);
  }

  render() {
    return (
      <ul id="taskList">
        {this.props.tasks.map((task, index) => (
          <Task
            key={index}
            text={task}
            onRemove={this.handleRemove.bind(this)}
          />
        ))}
      </ul>
    );
  }
}

/**
 * Represents a widget that can take user input and call
 * a function to add a new task.
 *
 * Props:
 *  - onAdd: A function that takes a single string with
 *      the text of the new task to add. The function is
 *      called whenever the button is clicked.
 *  - addedTasks: an array of already added tasks
 */
class TaskAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick() {
    this.props.onAdd(this.state.inputValue);
    this.setState({ inputValue: "" });
  }

  // Evaluates whether the task can be added
  canAddTask() {
    var input = this.state.inputValue.trim(); // remove white spaces

    // if input is empty or the task is duplicate, return false
    if (!input || this.props.addedTasks.includes(input)) {
      return false;
    } else return true;
  }

  render() {
    return (
      <div className="row">
        <input
          type="text"
          id="taskInput"
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}
        />
        <button
          onClick={this.handleClick.bind(this)}
          disabled={!this.canAddTask()}
        >
          +
        </button>
      </div>
    );
  }
}
