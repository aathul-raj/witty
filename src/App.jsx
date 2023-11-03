import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Trainer from "./Views/Trainer/Trainer";
import './App.css'
import Summary from "./Views/Summary/Summary";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/trainer" element={<Trainer/>}/>
          <Route path="/summary" element={<Summary/>}/>
        </Routes>
      </Router>
  )
}
export default App
