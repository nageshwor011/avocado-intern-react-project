import { Container } from "reactstrap";
import "./App.css";
import AddUser from "./components/AddUser";
import Update from "./components/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
  import 'react-toastify/dist/ReactToastify.css';
  import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddUser />} />
            <Route path="/update-user/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
        theme="colored"
        />
      </Container>
    </>
  );
}

export default App;
