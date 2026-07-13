import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TagManager from "react-gtm-module";

TagManager.initialize({
  gtmId: "GTM-5JXDQGGT",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
