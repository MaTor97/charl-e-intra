import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Content from './components/Content'
import './styles/main.scss'

function App() {
  const page = 'Article'

  const [bodyMode, setBodyMode] = useState(() => {
    return document.body.classList.contains('dark') ? 'dark' : 'light'
  })

  const toggleMode = () => {
    setBodyMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      document.body.classList.remove('light', 'dark')
      document.body.classList.add(newMode)
      return newMode
    })
  }

  useEffect(() => {
    document.body.classList.add(bodyMode)
  }, [bodyMode])

  return (
    <>
      <Header  />
      <div className="navigation">
        <h2>Catégories</h2>
        <Nav />
      </div>
      <Content page={page} />
      <Footer bodyMode={bodyMode} toggleMode={toggleMode} />
    </>
  )
}

export default App
