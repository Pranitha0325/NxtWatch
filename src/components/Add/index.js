
import {TiDeleteOutline} from 'react-icons/ti'
import './index.css'

const Add = props => {
    const {show, deleteAdd} = props 

    const deleteBanner = () => {
        deleteAdd()
    }
    return (
        <div >
        {show ? 
        <div className="add-container">
        <div className="banner">
        <img className="logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="website logo" />
        <p>Buy NxtWatch premium prepaid plans with UPI</p>
        <button type="button">GET IT NOW</button>
        </div>
        <button className="button" type="button" onClick={deleteBanner}>
        <TiDeleteOutline />
        </button>
        </div>
        : ''}
        </div>
    )
}

export default Add