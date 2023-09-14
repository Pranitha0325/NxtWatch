import {Component} from 'react'
import Cookies from 'js-cookie'
import {LoginContainer} from '../../StyledComponents'

class Login  extends Component {
  state = {username:"", password:"", errorMsg:"", showPass:false}

  changePass = e => {
    this.setState({password:e.target.value})
  }

  changeUsername = e =>{
  this.setState({username:e.target.value})
  }

  successView = token => {
      const {history} = this.props 
      Cookies.set("jwt_token", token, {expires:20})
      history.replace("/")
  }

  failureView = msg => {
    this.setState({errorMsg:msg})
  }

  submitLoginForm =async  e => {
    e.preventDefault()
    const {username, password} = this.state 
    const userDetails = {username, password}
    const url="https://apis.ccbp.in/login"
    const options ={
      method:"POST",
      body: JSON.stringify(userDetails)
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok===true){
      this.successView(data.jwt_token)
    }else{
      this.failureView(data.error_msg)
    }

  }

  toggleCheckBox = () =>{
    this.setState((prevState)=>({showPass:!prevState.showPass}))
  }
    render () {
    const {username, password, errorMsg, showPass} = this.state
    const token = Cookies.get("jwt_token")
    if (token!==undefined){
      const {history} = this.props 
      history.replace("/")
    }
    return (
        <LoginContainer>
        <div>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
        <form onSubmit={this.submitLoginForm} className="login-form">
        <label htmlFor="username">USERNAME</label>
        <input id="username" type="text" onChange={this.changeUsername}  placeholder="Username"/>
        <label htmlFor="pass">PASSWORD</label>
        {showPass ? 
        <input id="pass" type="text" onChange={this.changePass} placeholder="Password"  /> : <input id="pass" type="password" onChange={this.changePass} placeholder="Password"/>}
        <input id="show" onClick={this.toggleCheckBox} type="checkbox" />
        <label htmlFor="show">Show Password</label>
        <button type="submit" className="login-button">Login</button>
        <p>{errorMsg}</p>
        </form>
        </div>
        </LoginContainer>
    )
    }
}

export default Login