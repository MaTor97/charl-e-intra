import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Posts from "./pages/Posts";
import Article from "./pages/Article";
import Notifications from "./pages/Notifications";
import Account from "./pages/Account"
import './styles/main.scss';
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import { main } from "./assets/files/functions/hasChildrens";

const App = () => {
  const navigate = useNavigate(); // Ajoute useNavigate ici
  const [subCategoriesPages, setSubCategoriesPages] = useState([]);
  const [selected, setSelected] = useState(66);

  const [bodyMode, setBodyMode] = useState(() => {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
  });

  const toggleMode = () => {
    setBodyMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(newMode);
      return newMode;
    });
  };

  const goBack = () => {
    window.history.back();
  }


  useEffect(() => {
    // Si l'URL est simplement "/posts", redirige vers "/posts?categories=66"
    if (window.location.pathname === "/" && !window.location.search) {
      navigate("/posts?categories=66");
      setSelected(66)
    }

    const fetchData = async () => {
      const data = await main(); // Récupère les ID avec enfants
      setSubCategoriesPages(data);
    };

    fetchData();
  }, [navigate]); // Ajoute "navigate" dans les dépendances du useEffect

  useEffect(() => {
    document.body.classList.add(bodyMode);
  }, [bodyMode]);

  return (
    <div>
      <Header navigate={navigate} />
      <div className="navigation">
        <h2>Catégories</h2>
        <Nav selected={selected} setSelected={setSelected} navigate={navigate}/>
      </div>
      <Routes>
        <Route path="/posts" element={<Posts navigate={navigate}/>} />
        <Route path="/posts/:postId" element={<Article />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path='/Account' element={<Account />} />
      </Routes>
      <Footer 
        navigate={navigate} 
        goBack={goBack} 
        bodyMode={bodyMode} 
        toggleMode={toggleMode} 
        selected={selected} 
        setSelected={setSelected}
        />
    </div>
  );
};

export default App;
