import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./Components/LoginPage/LoginPage";
import VotePage from "./Components/VotePage/VotePage";
import AdminPage from "./Components/AdminPage/AdminPage";
import Header from "./Components/Header/Header";

function App() {
  const [pageHolder, setPageHolder] = useState("Login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );

  return (
    <div className="App">
      <ThemeProvider>
        <Header user={user} />
        {pageHolder == "Login" && (
          <LoginPage
            user={user}
            setUser={setUser}
            setPageHolder={setPageHolder}
          />
        )}
        {pageHolder == "Vote" && (
          <VotePage user={user} setUser={setUser} />
        )}
        {pageHolder == "Admin" && <AdminPage />}
      </ThemeProvider>
    </div>
  );
}

export default App;
