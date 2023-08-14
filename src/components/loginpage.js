import "../styles/loginpage.css"
import facebook from "../images/facebook.png"
import google from "../images/google.png"
import {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

import {auth, googleprovider, facebookprovider, database} from "./firebase"
import Cookies from "universal-cookie/es6";
import {addDoc, collection} from "firebase/firestore";

function Loginpage(props) {
    const {setAuth} = props;
    const cookies = new Cookies()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const user = collection(database, "users")
    const [emptyinput, setemptyinput] = useState("")
    const login = async () => {
        if (email && password !== "") {
            try {
                await createUserWithEmailAndPassword(auth, email, password)

            } catch (err) {
                console.log(err)
            }
        }

    }
    const loginwithgoogle = async () => {

        try {


            const account = await signInWithPopup(auth, googleprovider)
       console.log(account)
            await addDoc(user, {
                user: auth?.currentUser?.displayName,
                profilepicture: auth?.currentUser?.photoURL,
                userid: account.user.uid
            })
            cookies.set("authentication-token", account.user.refreshToken)
            cookies.set("uid", account.user.uid)
            localStorage.setItem("profilepicture", auth?.currentUser?.photoURL)
            localStorage.setItem("name", auth?.currentUser?.displayName)
            setAuth(true)

        } catch (err) {
            console.log(err)
        }
    }

    const loginwithfacebook = async () => {

        try {
            await signInWithPopup(auth, facebookprovider)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {


        setemptyinput(email && password !== "" ? '#00e673' : '#FA777C')

    }, [email, password])


    const Setemail = (e) => {

        setemail(e.target.value)


    }
    const Setpasswords = (e) => {
        setpassword(e.target.value)

    }


    return (
        <>
            <section className="sectioninlogin">
                <div className="con1">
                    <h1>Welcome to <span>Wetalk</span></h1>
                    <p>Don't have Account? Create your account , it takes only a minute</p>
                    <div>
                        <button>SIgn up</button>
                    </div>
                </div>
                <div className="con2">

                    <form onSubmit={event => event.preventDefault()}>
                        <h1>Login</h1>
                        <label htmlFor="">Your Username</label>
                        <input type="text" placeholder="Username...." onChange={Setemail}
                               style={{border: `1px solid ${emptyinput}`}}/>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password...." onChange={Setpasswords}
                               style={{border: `1px solid ${emptyinput}`}}/>
                        <div className="btnlogin">
                            <button onClick={login}>Login</button>
                            {/*<button onClick={logout}>logout</button>*/}
                        </div>
                        <div className="google">
                            <p>0r continue with</p>
                            <button onClick={loginwithgoogle}><img src={google} alt="google"/></button>
                            <button onClick={loginwithfacebook}><img src={facebook} alt="facebook"/></button>
                        </div>
                    </form>


                </div>
            </section>
        </>
    )
}

export default Loginpage;