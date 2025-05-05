import { useState } from "react";
import { LogoSVG, SearchSVG } from "../assets/files/SVG";

// Composant Header, contient la recherche et le logo
const Header = ({ navigate, handleNavigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Gestion de la recherche gràce a la route wp posts?search
  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    navigate(`/posts?search=${encodeURIComponent(searchTerm)}`);
  };

  // Recherche s'exécute aussi quand on appuie sur enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header>
      {/* Le logo ramène vers la page d'accueil */}
      <div className="logo" onClick={() => handleNavigation("/posts?categories=66")}>
        <LogoSVG className="icons" id="logo" />
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Article, Titre,..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div onClick={handleSearch}>
          <SearchSVG className="icons" />
        </div>
      </div>
    </header>
  );
};

export default Header;
