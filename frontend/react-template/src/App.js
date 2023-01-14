import "./App.css";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import LoginPop from "./components/NavBar/LoginPop";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="App">
          <NavBar />
          <Sidebar />
          <div className="page-body">
            <Feed />
          </div>
          {/* <Sidebar />
      <Feed /> */}
        </div>
      </Route>
      <Route exact path="/test">
        <LoginPop />
      </Route>
    </Switch>
  );
}

export default App;
