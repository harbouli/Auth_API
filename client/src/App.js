import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Singup">
            <Register />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
