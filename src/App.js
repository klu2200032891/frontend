import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Appbar from './components/Appbar';
import User from './components/User';
import Show from './components/Show';
import Home from './components/Home';
import { useState } from 'react';
import City from './components/City';
import Achievements from './components/Achievements';
import About from './components/About';

function App() {
  const [page, setPage] = useState("Home");

  function Page() {
    switch (page) {
      case "Signin":
        return (<div> <Appbar setPage={setPage} /> <SignIn setPage={setPage} /> </div>);
      case "Signup":
        return (<div> <Appbar setPage={setPage} /> <SignUp setPage={setPage} /> </div>);
      case "User":
        return (<div> <Appbar setPage={setPage} /> <User setPage={setPage} /> </div>);
      case "Show":
        return (<div> <Appbar setPage={setPage} /> <Show setPage={setPage} /> </div>);
      case "City":
        return (<div> <Appbar setPage={setPage} /> <City setPage={setPage} /> </div>);
      case "Achievements":
          return (<div> <Appbar setPage={setPage} /> <Achievements setPage={setPage} /> </div>);
          case "About":
            return (<div> <Appbar setPage={setPage} /> <About setPage={setPage} /> </div>);
      default:
        return (<div> <Appbar setPage={setPage} /> <Home setPage={setPage} /> </div>);
    }
  }

  return (
    <div className="App">
      <div className='App-body'>
        <Page />
      </div>
    </div>
  );
}

export default App;
