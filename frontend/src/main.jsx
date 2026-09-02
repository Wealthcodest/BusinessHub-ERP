import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from "@/components/ui";
import { ActiveBusinessProvider } from "@/app/ActiveBusinessContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActiveBusinessProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ActiveBusinessProvider>
  </StrictMode>,
)
