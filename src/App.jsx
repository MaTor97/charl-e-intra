// App.jsx est le coeur de l'application,
// Il affiche et les composants et suis les routes des pages
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

  // Fonction pour gérer le body mode et le passer de light a dark
  // elle est appellée onClick sur l'icone dans le footer
  const toggleMode = () => {
    setBodyMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(newMode);
      return newMode;
    });
  };

  // Retour à la page précédente
  const goBack = () => {
    window.history.back();
    setSelected('')
  }

  // Renvoie vers la route "endpoint" et change la bckgrd-color de l'élément
  const handleNavigation = (endpoint) => {
    setSelected(endpoint);
    navigate(endpoint);
  }

  // Initialise la page d'accueil
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

  // Initialise le bodyMode
  useEffect(() => {
    document.body.classList.add(bodyMode);
  }, [bodyMode]);

  return (
    <div>
      {/* HEADER */}
      <Header navigate={navigate} handleNavigation={handleNavigation} />
      {/* CATEGORIES + SOUS-CATEGORIES */}
      <div className="navigation">
        <h2>Catégories</h2>
        <Nav selected={selected} setSelected={setSelected} navigate={navigate}/>
      </div>
      {/* ROUTES -> CONTENU DE LA PAGE */}
      <Routes>
        <Route path="/" element={<Navigate to="/posts?categories=66" replace />} />
        <Route path="/posts" element={<Posts navigate={navigate}/>} />
        <Route path="/posts/:postId" element={<Article />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path='/Account' element={<Account />} />
      </Routes>
      {/* FOOTER */}
      <Footer 
        navigate={navigate} 
        goBack={goBack} 
        bodyMode={bodyMode} 
        toggleMode={toggleMode} 
        selected={selected} 
        handleNavigation={handleNavigation}
        />
    </div>
  );
};

export default App;
