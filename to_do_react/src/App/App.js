import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Todos from "../pages/Todos/Todos";
import Home from "../pages/Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/todos" className="nav-link">To do's</Link>
        </nav>

        <Switch>
          <Route path="/todos" component={() => <Todos/>} />
          <Route path="/" component={() => <Home/>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
