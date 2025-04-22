import { LogoSVG, SearchSVG } from "../assets/files/SVG"

const Header = ({navigate}) => {

  return (
    <header>
      <div className="logo" onClick={() => navigate("/posts?categories=66")}>
        <LogoSVG className="icons" id='logo' />
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Article, Titre,..." />
        <SearchSVG className='icons'/>
      </div>
    </header>
  )
}

export default Header
