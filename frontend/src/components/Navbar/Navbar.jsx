import './Navbar.css'
import logo from '../../assets/logo.png'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setshowlogin}) => {

    const {setCurrency,islogged,token,setToken}=useContext(CoinContext)
    const navigate =useNavigate();
    const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");

  }
    const currencyHandler=(event)=>{
        switch(event.target.value){
            case 'usd':{
                setCurrency({name:"usd",symbol:"$"})
            
            break;}
            case 'eur':{
                setCurrency({name:"eur",symbol:"€"})
                
                break;}
                case 'inr':{
                    setCurrency({name:"inr",symbol:"₹"})
                    
                    break;}
                    default:{
                        setCurrency({name:"usd",symbol:"$"})
                        break;
                        }
                    }

        }
       
    
  return (
    <div className='navbar'>
      <img src={logo} className="logo" alt="no" />
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/pricing'>Pricing</Link></li>
        <li> <Link to='/about'>About</Link></li>
        
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        {/* <button>
        <Link to='/login'>
        Sign up <img src={arrow_icon} alt="" /></Link>
        </button> */}
        {!islogged?
                <button onClick={()=>setshowlogin(true)}>sign in</button>
                :<div className="navbar-profile">
                    <ul className='nav-profile-dropdown'>
                        <li onClick={logout}><p>Logout</p></li>
                    </ul>
                </div>

                }
      </div>
    </div>
  )
}

export default Navbar
