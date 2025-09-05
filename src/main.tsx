import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// for testing the componets 
import TestComponents from './components/testcomponents.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestComponents />
  </StrictMode>,
)