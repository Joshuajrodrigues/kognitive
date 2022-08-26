import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={extendTheme({
        fonts: {
          body: "system-ui, sans-serif",
          heading: "Pacifico, serif",
          mono: "Menlo, monospace",
        },
      })} >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
