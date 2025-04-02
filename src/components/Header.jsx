import { LogoSVG, SearchSVG } from "../assets/files/SVG"

const Header = () => {
  return (
    <header>
      <div className="logoMode">
        <LogoSVG className="icons" id='logo' />
        
      </div>
          <SearchSVG className='icons'/>
    </header>
  )
}

export default Header
