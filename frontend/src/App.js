import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddStudent } from './pages/addStudent/AddStudent';
import { UpdateStudent } from './pages/updateStudent/UpdateStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/addStudent" element={<AddStudent />}></Route>
        <Route path="/updateStudent/:id" element={<UpdateStudent />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
