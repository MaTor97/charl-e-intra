import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Article from './components/FakeArticle'
import './styles/main.scss'

function App() {
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
      <Header bodyMode={bodyMode} toggleMode={toggleMode} />
      <Nav bodyMode={bodyMode}/>
      <Article bodyMode={bodyMode}/>
      <Footer bodyMode={bodyMode}/>
    </>
  )
}

export default App
