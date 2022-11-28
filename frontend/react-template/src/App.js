import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Sidebar />
      <div className="page-body">
        <Feed />
      </div>
      {/* <Sidebar />
      <Feed /> */}
    </div>
  );
}

export default App;
