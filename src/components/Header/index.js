import {Link} from 'react-router-dom'
import {AiOutlineHome, AiTwotoneHeart, AiFillFire} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {theme, changeTheme, showAdd} = props

  const changeLogo = () => {
    changeTheme()
  }
  return (
    <div>
    {theme ? <div className="header-dark">
    <Link to="/" >
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" alt="website logo" />
    </Link>
    <div>
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    <img className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
    <button type="button">Logout</button>
    </div> 
    </div> : 
    <div className="header-light">
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
    <div>
    <img onClick={changeLogo} className="dark-logo" src="https://media.istockphoto.com/id/1278486961/vector/moon-simple-icon-logo.jpg?s=612x612&w=0&k=20&c=nzNELqLZxTXHnFG9GLSggr8PsBpp9AjWRf9wfPJonSk=" />
    <img className="dark-logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
    <button type="button">Logout</button>
    </div>
    </div>
    }
    </div>
  )
}

export default Header