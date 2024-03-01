import Parse from "parse";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

Parse.initialize("dohcWHE4gVjTCUc2S0Y4PV4VAyqb9SHRySaPrnvs", "stCv313hkDktBSVC8hTz08x1lOcvrXJmTB9euR3m");
Parse.serverURL = "https://parseapi.back4app.com/";

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
