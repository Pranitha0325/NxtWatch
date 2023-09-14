import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {AiOutlineSearch} from 'react-icons/ai'
import {HomeContainer, Input} from '../../StyledComponents'
import NextContext from '../../context/NextContext'

import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class Home extends Component{
  state = {apiStatus:api.initial, data:[], searchInput:""} 

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus:api.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok===true){
      this.setState({data:data.videos, apiStatus:api.success})
    }else{
      this.setState({apiStatus:api.failure})
    }
  }

  searchValue = e =>{
    this.setState({searchInput:e.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  failureView = () => {
    return (
      <>
      </>
    )
  }

  renderData = () => {
    const {apiStatus, data} = this.state 
    if (apiStatus==="SUCCESS"){
      return (
        <div>
        <ul className="container">
        {data.map((item)=>(
          
          <li className="item" key={item.id}>
          <Link to={`/videos/${item.id}`}>
          <img className="thumbnail"  src={item.thumbnail_url} />
          <div className="title">
          <img className="profile" src={item.channel.profile_image_url} />
          <p>{item.title}</p>
          </div>
          <p>{item.channel.name}</p>
          <div className="item">
          <p>{item.view_count}</p>
          <p>{item.published_at}</p>
          </div>
          </Link>
          </li>
          
        ))}
        </ul>
        </div>
      )
    }else{
      this.failureView()
    }
  }


  render(){
    const {apiStatus, data} = this.state
    const api = apiStatus==="INPROGRESS"
    return (
  <NextContext.Consumer>

    {value => {
      const {darkTheme, changeTheme, showAdd, deleteAdd} = value
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
        <Input type="search" placeholder="Shearch" onChange={this.searchValue}></Input>
        <AiOutlineSearch />
        <div >
        {api ? this.renderLoader()
         : 
         this.renderData()}
        </div>
        </div>
        </HomeContainer>
        </div>
      )}}
      </NextContext.Consumer>
)
}
}

export default Home
