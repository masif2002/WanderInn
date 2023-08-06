import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { HomePage, LoginPage, RegisterPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}/>
        <Route path='login' element={<LoginPage />}/>
        <Route path='register' element={<RegisterPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
