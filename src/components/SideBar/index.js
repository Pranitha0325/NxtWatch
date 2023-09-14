import {Link} from 'react-router-dom'
import {AiOutlineHome, AiTwotoneHeart, AiFillFire} from 'react-icons/ai'

import './index.css'

const SideBar = props => {
    const {theme} = props 
    let color = "item-light"
      if (theme===true){
      color = "item-dark"
    }
    return(
    <div className={color}>
    <div className="side-bar">
    <div>
    <Link to="/" className="links">
    <AiOutlineHome />
    <p>Home</p>
    </Link>
    <Link to="/trending" className="links">
    <AiFillFire />
    <p>Trending</p>
    </Link>
    <Link to="/gaming" className="links">
    <AiTwotoneHeart />
    <p>Gaming</p>
    </Link>
    <Link to="/savedvideos" className="links">
    <AiOutlineHome />
    <p>Saved Videos</p>
    </Link>
    </div>
    <div>
    <h1>CONTACT US</h1>
    <div className="contacts">
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" />
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt=" twitter logo" />
    <img className="contact-icon" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="linked in logo" />
    </div>
    <p>Enjoy! Now to see your channels and recomendations</p>
    </div>
    </div>
    </div>
    )
}

export default SideBar