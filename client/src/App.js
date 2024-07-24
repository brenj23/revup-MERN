import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <routes>
        <route path="/" element={<LoginPage/>} />
        <route path="/home" element={<HomePage/>} />
        <route path="/profile/:userId" element={<ProfilePage/>} />
      </routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
