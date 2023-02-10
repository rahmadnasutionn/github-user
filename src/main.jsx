import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GithubProvider } from './context/context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Auth0Provider
    domain='dev-jadjx6x0u0rf0ddi.us.auth0.com'
    clientId='Nudrh0cAD0DYy8CuSs7X6LvrzsQAn4W7'
    authorizationParams={{ redirect_uri: window.location.origin }}>
    <GithubProvider>
     <App />
    </GithubProvider>
   </Auth0Provider>
  </React.StrictMode>,
)
