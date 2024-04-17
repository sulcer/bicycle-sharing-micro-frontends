import React from 'react'
import ReactDOM from 'react-dom/client'
import 'tailwindcss/tailwind.css';
import './index.scss'
import Payments from 'payments/Payments'
import Stations from 'stations/Stations'
import Users from 'users/Users'

const App = () => (
  <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      margin: '20px',
  }}>
    <div style={{color: "red", fontWeight: 'bold', fontSize: '40px'}}>BICYCLE SHARING PLATFORM</div>
    <Users />
    <Payments />
    <Stations />
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />);