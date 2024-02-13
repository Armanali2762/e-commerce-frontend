import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './Components/Login';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
