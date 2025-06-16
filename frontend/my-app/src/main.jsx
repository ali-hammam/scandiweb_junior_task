import { createRoot } from 'react-dom/client'
import { createClient, cacheExchange, fetchExchange } from '@urql/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'urql'
import './index.css'
import App from './App.jsx'

const client = createClient({
  url: 'http://localhost:8000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

createRoot(document.getElementById('root')).render(
  <Provider value={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
)
