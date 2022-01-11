import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';
import About from "./components/About"
import Home from './components/Home';
import NotesState from "./Context/notes/NotesState"
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  return (
    <NotesState>
  <Router>
          <Navbar/>

    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
    </Switch>
  </Router>
  </NotesState>
  );
}

export default App;
