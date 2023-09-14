import NextContext from '../../context/NextContext'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineDislike, AiFillDislike, AiFillLike, AiOutlineLike} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player';
import Header from '../Header'
import SideBar from '../SideBar'
import Add from '../Add'
import {HomeContainer} from '../../StyledComponents'
import './index.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE"}
class VideoItemDetails extends Component {
  state = {videoDetails:{}, apiStatus:api.initial, isVideoSaved:false, isLike:false, disLike:false}

  componentDidMount () {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus:api.inProgress})
    const token = Cookies.get("jwt_token")
    const {match} = this.props
    const {params} = match 
    const {id} = params 
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers:{
        Authorization :`Bearer ${token}`
      },
      method:"GET"
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok===true) {
      this.setState({videoDetails:data.video_details, apiStatus:api.success})
    }else{
      this.setState({apiStatus:api.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <>
    </>
  )

  renderdetailsView = () => {
    const {apiStatus} = this.state 
    if (apiStatus==="SUCCESS"){
      return (
        <NextContext.Consumer>
        {value => {
          const {isVideoSaved, videoDetails, isLike, disLike} = this.state
          const {id , video_url, description, title, view_count, published_at, channel} = videoDetails
          const {name, profile_image_url, subscribers_count} = channel
          const {addToSaveVideos, savedVideos, removeSaveVideos} = value 

            const saveItem = () =>{
              if (isVideoSaved===true){
                this.setState({isVideoSaved:false}, removeSaveVideos(id))
              }else{
                this.setState({isVideoSaved:true}, addToSaveVideos({...videoDetails}))
              }
          }

          const saveText = isVideoSaved ? "saved" : "save"

          const saveItemToList = () => {
            this.setState((prevState)=>({
              isVideoSaved:!prevState.isVideoSaved
            }), saveItem)
          }

          const like = () =>{
            this.setState((prevState)=>({isLike:!prevState.isLike, disLike:false}))
          }
          const dislike = () => {
            this.setState((prevState)=>({disLike:!prevState.disLike, isLike:false}))
          }

          const likeButton = isLike ? <AiFillLike onClick={like}/> : <AiOutlineLike onClick={like}/>

          const disLikeButton = disLike ? <AiFillDislike onClick={dislike} /> : <AiOutlineDislike onClick={dislike} />

        return (
        <div>
        <ReactPlayer url={video_url} controls={true}/>
        <p>{title}</p>
        <div className="count">
        <p>{view_count}</p>
        <p>{published_at}</p>
        <button>{likeButton}</button>
        <button>{disLikeButton}</button>
        <button type="button" onClick={saveItemToList}>{saveText}</button>
        </div>
        <hr/>
        <div className="count">
        <img className="image_" src={profile_image_url} />
        <div>
        <p>{name}</p>
        <p>{subscribers_count}</p>
        </div>
        </div>
        <p>{description}</p>
        </div>
        )
        }}
        </NextContext.Consumer>
      )
    }else{
      this.failureView()
    }
  }

  render () {
    const {apiStatus} = this.state 
    const loading = apiStatus==="INPROGRESS"
    return (
      <NextContext.Consumer>
    {value => {
    const {darkTheme, changeTheme, showAdd, deleteAdd, savedVideos } = value
    const background = darkTheme ? "dark" : "light"
    console.log(savedVideos)
  
      return (
        <div>
        <Header theme={darkTheme} changeTheme={changeTheme}/>
        <HomeContainer background={darkTheme}>
        <div>
        <SideBar theme = {darkTheme} />
        </div>
        <div>
        <Add show={showAdd} deleteAdd={deleteAdd} />
        {loading ? this.renderLoading() : this.renderdetailsView()
        }
        </div>
        </HomeContainer>
        </div>
        )
    }}
    </NextContext.Consumer>
        )
    }
}
    
export default VideoItemDetails