import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../i18n'
import App from './App.tsx'


const token = localStorage.getItem('token');
if (token) {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  }
} else {
  // Remove theme classes if not logged in
  document.body.classList.remove('light', 'dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
