import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import logo from './logo.svg';
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import './App.css';
import Header from './components/layout/Header';
import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
/*      {
        id: uuid.v4(),
        title: 'Block 01',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Block 02',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Block 03',
        completed: false
      }*/


    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').
    then(res => this.setState({ todos: res.data}))
  }


  markComplete = (id) => {
      this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })

      });
  }

  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter
      (todo => todo.id !== id)]});
  }

  addTodo = (title) => {
    console.log(title);
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]});
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} 
                delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
