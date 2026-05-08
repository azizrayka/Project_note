import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Components/Home/Home.tsx";
import Signin from "./Components/Signin.tsx";
import Signup from "./Components/Signup.tsx";
import Main from "./Components/Main/Main.tsx";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Main />} />
          <Route path={"/Notes/:user_id"} element={<Home />} />
            <Route path={"/signin"} element={<Signin />}/>
            <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
