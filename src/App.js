import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import NextContext from './context/NextContext'

import './App.css'

const api = {initial:"INITIAL", inProgress:"INPROGRESS", success:"SUCCESS", failure:"FAILURE", savedVideos:[]}
// Replace your code here
class App extends Component{
  state = {darkTheme:false, showAdd:true, savedVideos:[] }

  changeTheme = () => {
    this.setState((prevState)=>({darkTheme:!prevState.darkTheme}))
  }

  deleteAdd = () => {
    this.setState({showAdd:false})
  }

  addToSaveVideos = item => {
    const {savedVideos} = this.state
    const alreadyExist = savedVideos.filter((items)=>items.id===item.id)
    if (alreadyExist.length===0){
      this.setState({savedVideos:[...savedVideos, item]})
    }else{
      this.setState((prev)=>({
        savedVideos: [...prev.savedVideos]
      }))
    }
  }

  removeSaveVideos = id => {
    const {savedVideos} = this.state 
    const updatedList = savedVideos.filter((item)=>item.id!==id)
    this.setState({removeSavedVideos:updatedList})
  }
  
  render(){
    const {darkTheme, showAdd,savedVideos} = this.state
    return (
      <NextContext.Provider
      value = {{darkTheme, showAdd, deleteAdd:this.deleteAdd, changeTheme:this.changeTheme, savedVideos,removeSaveVideos:this.removeSaveVideos, addToSaveVideos:this.addToSaveVideos}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home}/ >
        <ProtectedRoute exact path="/trending" component={Trending}/ >
        <ProtectedRoute exact path="/gaming" component={Gaming}/ >
        <ProtectedRoute exact path="/savedvideos" component={SavedVideos}/ >
        <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
        <ProtectedRoute component={NotFound} />
      </Switch>
      </NextContext.Provider>
    )
  }
}
   

export default App
