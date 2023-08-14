
import "../styles/navbar.css"
import Call  from "../images/c.png"
import  Email from "../images/email.png"
import  Group from "../images/g.png"
import Chat from "../images/chat.png"
import {auth} from "./firebase";
import defaultimage from "../images/user.png"
import {signOut} from "firebase/auth";
import Cookies from "universal-cookie/es6";
import exit from "../images/exit.png"
import {useContext} from "react";
import Roomid from "./roomidcontext";
function Navbar(prop) {
    const {showSms, setshowSms} = useContext(Roomid)

    const profile=localStorage.getItem("profilepicture")
    const {setAuth}=prop
const cookie=new  Cookies();
    const logout = async () => {
        await signOut(auth)
     cookie.remove('authentication-token');
   setAuth(false)
        localStorage.removeItem('profilepicture')
        cookie.remove('roomid')
    }
    console.log(auth?.currentUser?.photoURL)

    const  showmodal=()=>{

        setshowSms(true)

    }
    return (
        <>
        <div className="navcon">

            <nav>
                 <div className="imguser">
                     {profile?<img src={profile} alt="User"/>:<img src={defaultimage} alt="User"/>}</div>
                <div><ul>
                    <li><button onClick={showmodal}><img src={Chat} alt=""/> </button></li>
                    <li><button><img src={Email} alt=""/> </button></li>
                    <li><button><img src={Group} alt=""/> </button></li>
                    <li><button><img src={Call} alt=""/> </button></li>
                </ul></div>

                <div className="btnlogout">
                    <hr/>
                    <button onClick={logout}><img src={exit} alt="logout"/></button>
                </div>
            </nav>
        </div>
        </>
    )
}
export  default Navbar;