import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./scenes/Layout";
import ViewUsers from "./scenes/ViewUsers";
import CreateUser from "./scenes/CreateUser";
import Main from "./scenes/Main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} default />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/viewuser" element={<ViewUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
