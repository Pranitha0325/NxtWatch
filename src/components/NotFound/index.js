import Header from '../Header'
import SideBar from '../SideBar'
import {HomeContainer} from '../../StyledComponents'
import NextContext from '../../context/NextContext'
import './index.css'

const NotFound = () => {
    return (
    <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd } = value
     
      return (
        <div>
        <Header theme={darkTheme} changeTheme={changeTheme}/>
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        {darkTheme ?
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" alt="not found" /> : <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" alt="not found"/> }
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
    )
}

export default NotFound