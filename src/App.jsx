import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage from './Components/LoginPage'
import VotePage from './Components/VotePage'
import AdminPage from './Components/AdminPage'
import Header from './Components/Header'

function App() {
  const [pageHolder , setPageHolder] = useState("Login")
  const [user , setUser] = useState({})

  return (
    <div className='App'>
    <ThemeProvider>
      <Header user={{name:"May Karam"}}/>
      {pageHolder == "Login" && <LoginPage user={user} setUser={setUser} setPageHolder={setPageHolder}/>}
      {pageHolder == "Vote" && <VotePage />}
      {pageHolder == "Admin" && <AdminPage />}

    </ThemeProvider>
    </div>
  )
}

export default App
