import NextContext from '../../context/NextContext'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer, Input} from '../../StyledComponents'
import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class Trending extends Component {
  state = {apiStatus:api.initial, data:[]} 

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus:api.inProgress})
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok===true){
      this.setState({data:data.videos, apiStatus:api.success})
    }else{
      this.setState({apiStatus:api.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderData = () => {
    const {data, apiStatus} = this.state 
    console.log(apiStatus)
    if (apiStatus==="SUCCESS"){
      return (
        <div>
        <h1>Trending</h1>
        <ul className="list">
        {data.map((item) => (
          <li className="items" key={item.id}>
          <Link to={`/videos/${item.id}`} >
          <img className="image" src={item.thumbnail_url} alt="" />
          <div>
          <h1>{item.title}</h1>
          <p>{item.channel.name}</p>
          <p>{item.view_count}</p>
          <p>{item.published_at}</p>
          </div>
          </Link>
          </li>
        ))}
        </ul>
        </div>
      )
    }
  }
  
  render () {
    const {apiStatus} = this.state 
    const api = apiStatus==="INPROGRESS"
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
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        <div >
        {api ? this.renderLoader()
         : 
         this.renderData()}
        </div>
        </div>
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
    )
  }
}
export default Trending