import { LogoSVG, SearchSVG } from "../assets/files/SVG"

const Header = ({navigate}) => {

  return (
    <header>
      <div className="logo" onClick={() => navigate("/posts?categories=66")}>
        <LogoSVG className="icons" id='logo' />
      </div>
          <SearchSVG className='icons'/>
    </header>
  )
}

export default Header
