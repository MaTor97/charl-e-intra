import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Content from './components/Content'
import './styles/main.scss'

function App() {
  const [page, setPage] = useState(66)
  const [previousPages, setPreviousPages] = useState([])
  const [selected, setSelected] = useState(66);

  const [bodyMode, setBodyMode] = useState(() => {
    return document.body.classList.contains('dark') ? 'dark' : 'light'
  })

  const updatePage = (newPage) => {
    setPreviousPages((prev) => [...prev, page]);
    setPage(newPage);
    setSelected(newPage);
};

const goBack = () => {
  if (previousPages.length > 0) {
      const lastPage = previousPages[previousPages.length - 1];
      setPreviousPages((prev) => prev.slice(0, -1));
      setPage(lastPage);
      setSelected(lastPage);
  } else {
      console.log("Aucune page précédente disponible !");
  }
};

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
        <Nav setPage={updatePage} selected={selected} setSelected={setSelected}/>
      </div>
      <Content page={page} setPage={updatePage} />
      <Footer bodyMode={bodyMode} toggleMode={toggleMode} goBack={goBack} />
    </>
  )
}

export default App
