import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Article from './components/FakeArticle'
import './styles/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Nav />
      <Article />
      <Footer />
    </>
  )
}

export default App
