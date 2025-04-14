import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Posts from "./pages/Posts";
import './styles/main.scss';
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import { main } from "./assets/files/functions/hasChildrens";


const App = () => {
  const [bodyMode, setBodyMode] = useState(() => {
    return document.body.classList.contains('dark') ? 'dark' : 'light'
  })
  const [subCategoriesPages, setSubCategoriesPages] = useState([]);
  const [selected, setSelected] = useState(66);

  useEffect(() => {
    const fetchData = async () => {
      const data = await main(); // Récupère les ID avec enfants
      setSubCategoriesPages(data);
    };
  
    fetchData();
  }, []);

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
    <div>
      <Header />
      <div className="navigation">
        <h2>Catégories</h2>
        <Nav selected={selected} setSelected={setSelected}/>
      </div>
      <Routes>
        <Route 
          path="/posts" 
          element={<Posts />} 
          />
      </Routes>
      <Footer bodyMode={bodyMode} toggleMode={toggleMode} />
    </div>
  );
};

export default App;
