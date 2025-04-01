import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import './styles/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
      <Header className='dark'/>
      <Nav />
      <Footer />
    </body>
  )
}

export default App
