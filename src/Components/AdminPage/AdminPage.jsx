import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import './AdminPage.css'

export default function AdminPage() {
  const {theme} = useTheme()
  return (
    <div className={theme ? "pages-light" : "pages-dark"}>AdminPage</div>
  )
}

