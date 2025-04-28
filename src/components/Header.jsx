import { useState } from "react";
import { LogoSVG, SearchSVG } from "../assets/files/SVG";

const Header = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    navigate(`/posts?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="logo" onClick={() => navigate("/posts?categories=66")}>
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
