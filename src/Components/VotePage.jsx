import React from 'react'
import { useTheme } from '../context/ThemeContext'
import './style.css'

export default function VotePage() {
  const {theme} = useTheme()
  return (
    <div className={theme ? "pages-light" : "pages-dark"}>VotePage</div>
  )
}
