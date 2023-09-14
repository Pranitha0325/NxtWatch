import NextContext from '../../context/NextContext'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer} from '../../StyledComponents'
import './index.css'

const SavedVideos = () => (
    <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd, savedVideos } = value
    console.log(savedVideos)
    const background = darkTheme ? "dark" : "light"
     
      return (
        <div>
        <Header theme={darkTheme} changeTheme={changeTheme}/>
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        {savedVideos.map((item)=>(
          <li className="items" key={item.id}>
          <img className="image" src={item.thumbnail_url} alt="" />
          <div>
          <h1>{item.title}</h1>
          <p>{item.channel.name}</p>
          <p>{item.view_count}</p>
          <p>{item.published_at}</p>
          </div>
          </li>
          ))}
        </div>
        </HomeContainer>
            </div>
        )
    }}
    </NextContext.Consumer>
)

export default SavedVideos