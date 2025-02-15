import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login.jsx"
function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login/>}></Route>
      <Route path="/" element={<>add routes big bro</>}></Route>
    </Routes>
  </BrowserRouter>
  </>)
}
  export default App